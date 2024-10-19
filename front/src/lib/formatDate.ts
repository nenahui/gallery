import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatDate = (dateString: string): string => {
  const date = dayjs(dateString);
  const now = dayjs();

  if (date.isSame(now, 'day')) {
    return date.fromNow();
  } else if (date.isSame(now.subtract(1, 'day'), 'day')) {
    return `Yesterday ${date.format('hh:mm A')}`;
  } else if (date.isSame(now, 'week')) {
    return date.format('dddd hh:mm A');
  } else if (date.isSame(now, 'year')) {
    return date.format('MMM, dddd [at] hh:mm A');
  } else {
    return date.format('DD.MM.YY hh:mm A');
  }
};
