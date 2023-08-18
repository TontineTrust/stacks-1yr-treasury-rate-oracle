#!/usr/bin/env node

import express from 'express'
import { updateRate } from './modules/scheduler.js'
import cron from 'node-cron'
import { endPoints } from './modules/endpoints.js'

// Return the rate to any clients.
endPoints(express())

// Schedule pushing the rate to Stacks on interval.
// The '0 0 * * *' indicates 10:30UTC (which is 06:30 EDT) every day.
// Order is seconds(optional),minutes,hour,day,month,day of week
cron.schedule('30 10 * * *', updateRate)
