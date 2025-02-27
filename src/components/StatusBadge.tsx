import classNames from 'classnames';
import React from 'react';
import { Status } from '../types';

interface StatusBadgeProps {
  status: Status;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  return (
    <span
      className={classNames('status-badge', {
        'status-badge--online': status === Status.ONLINE,
        'status-badge--draft': status === Status.DRAFT,
        'status-badge--stopped': status === Status.STOPPED,
        'status-badge--paused': status === Status.PAUSED,
      })}
    >
      {status}
    </span>
  );
};

export default StatusBadge;
