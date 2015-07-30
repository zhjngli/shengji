export function initUserLanguage() {
  var language = amplify.store("language");

  if (language){
    Session.set("language", language);
  }

  setUserLanguage(getUserLanguage());
}

export function getUserLanguage() {
  var language = Session.get("language");

  if (language){
    return language;
  } else {
    return "en";
  }
};

export function setUserLanguage(language) {
  TAPi18n.setLanguage(language).done(function () {
    Session.set("language", language);
    amplify.store("language", language);
  });
}

export function getLanguageDirection() {
  var language = getUserLanguage()
  var rtlLanguages = ['he'];

  if ($.inArray(language, rtlLanguages) !== -1) {
    return 'rtl';
  } else {
    return 'ltr';
  }
}

export function getLanguageList() {
  var languages = TAPi18n.getLanguages();
  var languageList = _.map(languages, function(value, key) {
    var selected = "";
    
    if (key == getUserLanguage()){
      selected = "selected";
    }

    return {
      code: key,
      selected: selected,
      languageDetails: value
    };
  });
  
  if (languageList.length <= 1){
    return null;
  }
  
  return languageList;
}
