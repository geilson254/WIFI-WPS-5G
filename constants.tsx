
import React from 'react';
import { SecurityType } from './types';

export const MOCK_NETWORKS: any[] = [
  {
    id: '1',
    ssid: 'TP-Link_9A42',
    bssid: 'C0:4A:00:2B:9A:42',
    signalStrength: -45,
    security: SecurityType.WPA2,
    channel: 6,
    frequency: '2.4GHz',
    isVulnerable: true,
    vendor: 'TP-Link'
  },
  {
    id: '2',
    ssid: 'Apartamento 402',
    bssid: 'E4:5F:01:8C:44:11',
    signalStrength: -62,
    security: SecurityType.WPA2,
    channel: 11,
    frequency: '2.4GHz',
    isVulnerable: false,
    vendor: 'D-Link'
  },
  {
    id: '3',
    ssid: 'Starbucks_Free_WiFi',
    bssid: '00:14:D1:E8:A1:02',
    signalStrength: -38,
    security: SecurityType.OPEN,
    channel: 149,
    frequency: '5GHz',
    isVulnerable: true,
    vendor: 'Cisco'
  },
  {
    id: '4',
    ssid: 'NSA_Surveillance_Van',
    bssid: 'AA:BB:CC:DD:EE:FF',
    signalStrength: -78,
    security: SecurityType.WPA3,
    channel: 36,
    frequency: '5GHz',
    isVulnerable: false,
    vendor: 'Unknown'
  },
  {
    id: '5',
    ssid: 'NetVirtua_502B',
    bssid: '70:54:D2:11:50:2B',
    signalStrength: -55,
    security: SecurityType.WPA2,
    channel: 1,
    frequency: '2.4GHz',
    isVulnerable: true,
    vendor: 'Sagemcom'
  },
  {
    id: '6',
    ssid: 'Shopping_Center_Guest',
    bssid: 'BC:22:99:A1:33:44',
    signalStrength: -40,
    security: SecurityType.OPEN,
    channel: 11,
    frequency: '2.4GHz',
    isVulnerable: true,
    vendor: 'Aruba'
  },
  {
    id: '7',
    ssid: 'Airport_Global_Free',
    bssid: 'DE:AD:BE:EF:00:01',
    signalStrength: -50,
    security: SecurityType.OPEN,
    channel: 44,
    frequency: '5GHz',
    isVulnerable: true,
    vendor: 'Ubiquiti'
  },
  {
    id: '8',
    ssid: 'Biblioteca_Municipal',
    bssid: '11:22:33:44:55:66',
    signalStrength: -65,
    security: SecurityType.OPEN,
    channel: 6,
    frequency: '2.4GHz',
    isVulnerable: true,
    vendor: 'TP-Link'
  }
];

export const VULNERABILITY_COLORS = {
  high: 'text-red-500',
  medium: 'text-yellow-500',
  low: 'text-green-500'
};
