import MaintenanceScreen from "@/components/maintenance/MaintenanceScreen";

// Dedicated maintenance route. The public reaches this via the proxy gate
// (proxy.ts rewrites every other URL here with a 503 while MAINTENANCE_MODE is on).
export default function MaintenancePage() {
  return <MaintenanceScreen />;
}
