import {
  SchedulerClient,
  CreateScheduleCommand,
  ScheduleState,
  // FlexibleTimeWindowMode,
} from '@aws-sdk/client-scheduler'; // ES Modules import

import { v4 as uuid } from 'uuid';

export const schedulerSample = async ({
  scheduleExpression, // at(2024-02-01T08:07:39)
  description,
  payload,
  startDate,
  endDate,
  state,
}) => {
  const schedulerClient = new SchedulerClient({ region: 'ap-south-1' });

  const schedulerId = uuid();

  // cron(minutes hours day-of-month month day-of-week year)
  // 0 0 1-24,26-31 12 * ? will not include 25th Desc

  const State =
    state === 'DISABLED' ? ScheduleState.DISABLED : ScheduleState.ENABLED;
  console.log('>>>1state', State);

  const input = {
    Name: schedulerId, // required
    ScheduleExpression: scheduleExpression, // required
    Description: description ?? 'testing scheduler',
    State: state,
    Target: {
      Arn: 'arn:aws:lambda:ap-south-1:258123983838:function:test', // required
      RoleArn: 'arn:aws:iam::258123983838:role/EvenbridgeSchedularAssumePolicy', // required
      Input: JSON.stringify(payload ?? ''),
    },
    FlexibleTimeWindow: {
      Mode: 'OFF', // required
    },
    ...(startDate && { StartDate: new Date(startDate) }),
    ...(endDate && { EndDate: new Date(endDate) }),
  };

  const command = new CreateScheduleCommand(input);
  const response = await schedulerClient.send(command);

  console.log(
    '>>>state',
    state,
    ScheduleState.DISABLED,
    state === ScheduleState.DISABLED,
    state == ScheduleState.DISABLED
  );

  console.log('createSchedule service: response:', {
    input,
    response,
    schedulerId,
  });
  return { input, response, schedulerId };
};
