import { useLanguage, Language } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLang = languages.find(lang => lang.code === language);

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-orange-500/50 transition-all duration-300">
        <Globe size={16} className="text-orange-500" />
        <span className="text-sm font-medium text-white">
          {currentLang?.flag} {currentLang?.name}
        </span>
      </button>
      
      <div className="absolute top-full right-0 mt-2 bg-gray-900/95 backdrop-blur-md rounded-lg border border-gray-700 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[140px]">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-800/50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              language === lang.code ? 'bg-orange-500/20 text-orange-400' : 'text-white'
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span className="text-sm font-medium">{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;