const Team = require('../models/model');

const axios = require('axios');

const getAllTeams = async (req, res) => {
    try{
        const teams = await Team.find();
        res.status(200).json({success : true, data: teams , count : teams.length});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

const createTeam = async (req, res) => {
    try{
        const {name , city } = req.body;
        if(!name || !city) {
            return res.status(400).json({success: false, message: 'Name and city are required'});
        }
        const team = new Team({name, city});
        await team.save();
        res.status(201).json({success: true, data: team});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}



// kuntenar intereksn


const getTeamPlayers = async (req, res) => {
    try {
        const {teamId} = req.params.id;
        const team = await Team.findById(teamId);
        if (!team) {
            return res.status(404).json({success: false, message: 'Team not found'});
        }
        const response = await axios.get(`https://djnago_app:8000/api/players/team/${teamId}/`)
        res.status(200).json({success: true, players: response.data.data || [] , team: team.name});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

module.exports = {
    getAllTeams,
    createTeam,
    getTeamPlayers
};

