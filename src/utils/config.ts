import { INewUserAPI } from './interfaces'

// The API user, should be provisioned on build with local Rocket.Chat
export const apiUser: INewUserAPI = {
  username: process.env.ADMIN_USERNAME || 'admin',
  password: process.env.ADMIN_PASS || 'admin'
}

// The Bot user, will attempt to login and run methods in tests
export const botUser: INewUserAPI = {
  email: 'bot@localhost',
  name: 'Bot',
  password: process.env.ROCKETCHAT_PASSWORD || 'bot',
  username: process.env.ROCKETCHAT_USER || 'bot',
  active: true,
  roles: ['bot'],
  joinDefaultChannels: true,
  requirePasswordChange: false,
  sendWelcomeEmail: false,
  verified: true
}

// The Mock user, will send messages via API for the bot to respond to
export const mockUser: INewUserAPI = {
  email: 'mock@localhost',
  name: 'Mock User',
  password: 'mock',
  username: 'mock',
  active: true,
  roles: ['user'],
  joinDefaultChannels: true,
  requirePasswordChange: false,
  sendWelcomeEmail: false,
  verified: true
}
