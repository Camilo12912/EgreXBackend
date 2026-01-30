const Event = require('../models/Event');
const EventRegistration = require('../models/EventRegistration');

class EventService {
    async getEventsForUser(userId) {
        const events = await Event.findAll();
        return await Promise.all(events.map(async (event) => {
            const isRegistered = await EventRegistration.isRegistered(event.id, userId);
            return { ...event, isRegistered };
        }));
    }

    async createEvent(eventData) {
        const { title, date } = eventData;
        if (!title || !date) {
            throw new Error('Title and Date are required');
        }

        const eventDate = new Date(date);
        const now = new Date();

        // Use a 5 minute buffer to allow creating events for "right now"
        // without being blocked by seconds/milliseconds difference
        const buffer = 5 * 60 * 1000;
        const compareTime = now.getTime() - buffer;

        if (isNaN(eventDate.getTime())) {
            throw new Error('Invalid Date');
        }

        if (eventDate.getTime() < compareTime) {
            throw new Error('Cannot create event in the past');
        }

        return await Event.create(eventData);
    }

    async deleteEvent(id) {
        const deleted = await Event.delete(id);
        if (!deleted) {
            throw new Error('Event not found');
        }
        return true;
    }

    async registerUserToEvent(eventId, userId, formResponses) {
        const event = await Event.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }

        const eventDate = new Date(event.date);
        const currentDate = new Date();

        // Allowing registration until the event starts
        if (eventDate < currentDate) {
            throw new Error('Cannot register for past events');
        }

        return await EventRegistration.register(eventId, userId, formResponses);
    }

    async updateEvent(id, eventData) {
        const existingEvent = await Event.findById(id);
        if (!existingEvent) {
            throw new Error('Event not found');
        }

        const { date } = eventData;
        if (date) {
            const eventDate = new Date(date);
            if (isNaN(eventDate.getTime())) {
                throw new Error('Invalid Date');
            }
        }

        return await Event.update(id, eventData);
    }

    async getParticipants(eventId) {
        return await EventRegistration.getParticipants(eventId);
    }

    async markAttendance(eventId, userId, attended) {
        return await EventRegistration.markAttendance(eventId, userId, attended);
    }
}

module.exports = new EventService();
