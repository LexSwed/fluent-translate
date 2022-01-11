import { RecentLanguages } from './RecentLanguages';
import { Option, Select } from './styled';
import { useRecentLanguages } from './useRecentLanguages';

type Props = {
  value: string;
  onChange: (value: string) => void;
  languages: Languages;
  label: string;
};

export const LanguageSelect: React.FC<Props> = ({
  label,
  value,
  onChange,
  languages,
}) => {
  const [recent, addRecent] = useRecentLanguages();

  return (
    <Select
      value={value}
      aria-label={label}
      title={label}
      onChange={(e) => {
        const { value } = e.target;
        addRecent(value);
        onChange(value);
      }}
    >
      <RecentLanguages recent={recent} languages={languages} />
      <optgroup label="Languages">
        {Object.entries(languages).map(([lang, name]) => (
          <Option key={lang} value={lang}>
            {name}
          </Option>
        ))}
      </optgroup>
    </Select>
  );
};
