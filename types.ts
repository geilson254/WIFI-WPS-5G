
export enum SecurityType {
  OPEN = 'Aberta',
  WEP = 'WEP (Vulnerável)',
  WPA = 'WPA',
  WPA2 = 'WPA2-PSK',
  WPA3 = 'WPA3',
  ENTERPRISE = 'Enterprise'
}

export interface WiFiNetwork {
  id: string;
  ssid: string;
  bssid: string;
  signalStrength: number; // -100 to -30
  security: SecurityType;
  channel: number;
  frequency: '2.4GHz' | '5GHz' | '6GHz';
  isVulnerable: boolean;
  vendor: string;
}

export interface SecurityReport {
  score: number; // 0-100
  vulnerabilities: string[];
  recommendations: string[];
  estimatedCrackingTime: string;
  likelyDefaultPasswords: string[];
}
