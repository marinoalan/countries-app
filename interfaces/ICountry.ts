interface ICountryFlag {
  png: string;
  svg: string;
}

interface ICountryNativeName {
  [key: string]: {
    official: string;
    common: string;
  };
}

interface ICountryLanguage {
  [key: string]: string;
}

interface ICountryName {
  common: string;
  official: string;
  nativeName: ICountryNativeName;
}

interface ICountry {
  flags: ICountryFlag;
  name: ICountryName;
  capital: string[];
  languages: ICountryLanguage;
  latlng: [string, string];
  flag: string;
}

export default ICountry;
