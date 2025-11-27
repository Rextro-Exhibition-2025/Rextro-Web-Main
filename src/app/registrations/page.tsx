import RegistrationsPage from '@/components/Registrations/RegistrationsPage';
import { events } from '@/lib/eventData';
import type { EventData } from '@/lib/eventData';

export const metadata = {
  title: 'Registrations - ReXtro',
  description: 'Register for zone sessions published for ReXtro 2025',
};

const getAvailableZoneSessions = (): EventData[] => {
  return events.filter(e => e.category === 'zone-session' && e.isAvailable === true);
};

export default function Page() {
  const available = getAvailableZoneSessions();

  return (
    <RegistrationsPage initialEvents={available} />
  );
}
