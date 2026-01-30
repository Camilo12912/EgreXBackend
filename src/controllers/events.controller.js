const EventService = require('../services/events.service');

exports.getEvents = async (req, res) => {
    try {
        const userId = req.user.id;
        const events = await EventService.getEventsForUser(userId);
        res.json(events);
    } catch (error) {
        console.error('Error getting events:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, location, imageUrl, formQuestions } = req.body;
        const imageData = req.file ? req.file.buffer : null;

        const newEvent = await EventService.createEvent({
            title, description, date, location, imageUrl, imageData,
            formQuestions: typeof formQuestions === 'string' ? JSON.parse(formQuestions) : formQuestions
        });
        res.status(201).json(newEvent);
    } catch (error) {
        if (error.message.includes('past')) {
            return res.status(400).json({ error: 'No se pueden crear eventos con fecha o hora anterior a la actual' });
        }
        if (error.message.includes('required')) {
            return res.status(400).json({ error: 'El título y la fecha son obligatorios' });
        }
        console.error('Error creating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await EventService.deleteEvent(id);
        res.json({ message: 'Event deleted successfully' });
    } catch (error) {
        if (error.message === 'Event not found') {
            return res.status(404).json({ error: error.message });
        }
        console.error('Error deleting event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.registerToEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const { formResponses } = req.body;

        const registration = await EventService.registerUserToEvent(id, userId, formResponses);
        res.json({ message: 'Registered successfully', registration });
    } catch (error) {
        if (error.message === 'Event not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Cannot register for past events') {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error registering to event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.markAttendance = async (req, res) => {
    try {
        const { eventId, userId } = req.params;
        const { attended } = req.body;

        const registration = await EventService.markAttendance(eventId, userId, attended);
        res.json({ message: 'Attendance updated', registration });
    } catch (error) {
        console.error('Error marking attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getEventParticipants = async (req, res) => {
    try {
        const { id } = req.params;
        const participants = await EventService.getParticipants(id);
        res.json(participants);
    } catch (error) {
        console.error('Error getting participants:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, date, location, imageUrl, formQuestions } = req.body;
        // FIX: Use undefined if no file, so Model.update checks !== undefined and skips overwrite
        const imageData = req.file ? req.file.buffer : undefined;

        const updatedEvent = await EventService.updateEvent(id, {
            title, description, date, location, imageUrl, imageData,
            formQuestions: typeof formQuestions === 'string' ? JSON.parse(formQuestions) : formQuestions
        });
        res.json(updatedEvent);
    } catch (error) {
        if (error.message === 'Event not found') {
            return res.status(404).json({ error: error.message });
        }
        if (error.message === 'Invalid Date') {
            return res.status(400).json({ error: error.message });
        }
        console.error('Error updating event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
