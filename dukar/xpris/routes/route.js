const express = require('express');
const router = express.Router();    
const {
    getAllTeams,
    createTeam,
    getTeamPlayers  
} = require('../controllers/index');

router.get('/teams', getAllTeams);
router.post('/teams', createTeam);
router.get('/teams/:id/players', getTeamPlayers);

module.exports = router;
