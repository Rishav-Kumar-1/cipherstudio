const express = require('express');
const jwt = require('jsonwebtoken');
const Project = require('../models/Project');
const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'cipherstudio-secret-key-2024', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Create new file or folder
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { projectId, name, type, content, parentId } = req.body;

    if (!projectId || !name || !type) {
      return res.status(400).json({ 
        message: 'Project ID, name, and type are required' 
      });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newFile = {
      id: require('uuid').v4(),
      name,
      type,
      content: content || '',
      parentId: parentId || null
    };

    if (type === 'folder') {
      newFile.children = [];
    }

    project.files.push(newFile);
    await project.save();

    res.status(201).json({
      message: 'File created successfully',
      file: newFile
    });
  } catch (error) {
    console.error('Create file error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message 
    });
  }
});

// Update file content
router.put('/:fileId', authenticateToken, async (req, res) => {
  try {
    const { fileId } = req.params;
    const { projectId, content, name } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const updateFile = (files) => {
      return files.map(file => {
        if (file.id === fileId) {
          return {
            ...file,
            content: content !== undefined ? content : file.content,
            name: name !== undefined ? name : file.name
          };
        }
        if (file.children) {
          file.children = updateFile(file.children);
        }
        return file;
      });
    };

    project.files = updateFile(project.files);
    await project.save();

    res.json({ message: 'File updated successfully' });
  } catch (error) {
    console.error('Update file error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message 
    });
  }
});

// Delete file or folder
router.delete('/:fileId', authenticateToken, async (req, res) => {
  try {
    const { fileId } = req.params;
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    if (project.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Access denied' });
    }

    const removeFile = (files) => {
      return files.filter(file => {
        if (file.id === fileId) return false;
        if (file.children) {
          file.children = removeFile(file.children);
        }
        return true;
      });
    };

    project.files = removeFile(project.files);
    await project.save();

    res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({ 
      message: 'Server error', 
      error: process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message 
    });
  }
});

module.exports = router;
