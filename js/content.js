var context = "bh2017";
var companyGroups = ["Apoio", "Patrocinio", "Parceiros"];

function addField(name, data) {

  var template = $('#' + name + 'Template');
  var section = $('#' + name + 'Section');

  if (!data.esconder) {

    if (companyGroups.indexOf(name) != -1) {
      template
      .clone()
      .removeAttr('id')
      .removeAttr('hidden')
      .attr('href', data.link)
      .children('img')
      .attr('src', data.imagem)
      .attr('alt', data.empresa)
      .parent()
      .prependTo(section);
    } else {
      template
      .clone()
      .removeAttr('id')
      .removeAttr('hidden')
      .find('img')
      .attr('src', data.imagem)
      .attr('alt', data.nome)
      .attr('href', data.link).end()
      .find('.fa-facebook')
      .attr('href', data.facebook).end()
      .find('.fa-linkedin')
      .attr('href', data.linkedin).end()
      .find('h3')
      .text(data.nome).end()
      .find('p')
      .text(data.empresa).end()
      .find('i')
      .text(data.data).end()
      .prependTo(section);
    }
  }
}

// Pega os dados do Firebase e popula
firebase.database().ref().once('value').then(function(snapshot) {
  var content = snapshot.val();

  var contentTemplate = $('#contentTemplate');

  content.forEach(function (obj, key) {
    if (key > 0) {
      Object.keys(obj).forEach(function (name) {
        obj[name].reverse();
        obj[name].forEach((data, areaKey) => {
          addField(name, data);
        });
      });
    }
  });
});
