import { useAppSelector } from "../redux/hooks/hooks";
const getLabel = (lang: any, key: any) => {
  try {
    const lowerCaseKey: any = key
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, "_")
      .replace(/ /g, "_");
    if (lang.result[lowerCaseKey]) return lang.result[lowerCaseKey];
    else {
      // convert no found language label key to label

      const remove_underscore_fromKey = key.replace(/_/g, " ").split(" ");

      const conversionOfAllFirstCharacterofEachWord =
        remove_underscore_fromKey.map(
          (word: any) => word[0].toUpperCase() + word.substring(1)
        );

      const label = conversionOfAllFirstCharacterofEachWord.join(" ");

      const result = window.localStorage.getItem("lang");
      if (!result) {
        let list: any = {};
        list[lowerCaseKey] = label;
        window.localStorage.setItem("lang", JSON.stringify(list));
      } else {
        let list = { ...JSON.parse(result) };
        list[lowerCaseKey] = label;
        window.localStorage.removeItem("lang");
        window.localStorage.setItem("lang", JSON.stringify(list));
      }
      return label;
    }
  } catch (error) {
    return "No translate";
  }
};

const useLanguage = () => {
  const lang = useAppSelector((state) => state.translate);

  const translate = (value: any) => getLabel(lang, value);

  return translate;
};

export default useLanguage;
