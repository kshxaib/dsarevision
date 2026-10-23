import {
  Network,
  Database,
  FileSpreadsheet,
  Boxes,
  Cpu,
  FileCode,
  Atom,
  Server,
  Terminal,
  Coffee,
  Globe,
  BookOpen,
  FolderCode,
} from 'lucide-react';

const iconMap = {
  Network,
  Database,
  FileSpreadsheet,
  Boxes,
  Cpu,
  FileCode,
  Atom,
  Server,
  Terminal,
  Coffee,
  Globe,
  BookOpen,
};

export default function VaultIcon({ name, className = 'w-5 h-5', style }) {
  const IconComponent = iconMap[name] || FolderCode;
  return <IconComponent className={className} style={style} />;
}
