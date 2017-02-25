$(document).ready(() => {

  const context = "bh2017";
  const keys = {};
  const companyGroups = ["Apoio", "Patrocinio", "Parceiros"];

  $('#addField').on('click', () => {
    const tabName = $('ul[role=tablist]').children('.ui-state-active').attr('aria-controls');
    const name = tabName.substr(4);
    addField($(`#${tabName}`), name);
  });

  $(document).on('change', 'input', function () {
    $(this).addClass('input-changed');
  });

  function addField(tab, id, key, data) {
    let template, image;

    keys[id] = key || ++keys[id];

    if (companyGroups.indexOf(id) == -1) {
      template = $('#personTemplate');
    } else {
      template = $('#companyTemplate');
    }

    const newTemplate = template
    .clone()
    .removeAttr('id')
    .removeAttr('hidden')
    .prependTo(tab);

    if (data) {
      newTemplate
      .find('input[name=nome]').val(data.nome).end()
      .find('input[name=empresa]').val(data.empresa).end()
      .find('input[name=data]').val(data.data).end()
      .find('input[name=imagem]').val(data.imagem).end()
      .find('img').attr('src', data.imagem).end()
      .find('input[name=link]').val(data.link).end()
      .find('input[name=facebook]').val(data.facebook).end()
      .find('input[name=linkedin]').val(data.linkedin).end()
      .find('input[name=esconder]').attr('checked', data.esconder).end();
    }

    const form = newTemplate.find('form');
    form.attr('id', `form${id}${key}`);
    form.on('submit', (e) => {
      e.preventDefault();

      var inputs = form.find('input');

      inputs.removeClass('input-changed');

      var values = {};
      inputs.each(function() {
        values[this.name] = $(this).val();
      });
      values.esconder = form.find('input[name=esconder]').is(':checked');

      const url = newTemplate.find('input[name=imagem]').val();
      newTemplate.find('img').attr('src', url);

      firebase.database().ref(`/1/${id}/${key}`).set(values);
    });
  }

  firebase.database().ref().once('value').then(function(snapshot) {
    var content = snapshot.val();

    const tabTemplate = $('#tabTemplate');
    const contentTemplate = $('#contentTemplate');

    content.forEach((obj, key) => {
      if (key > 0) {
        Object.keys(obj).forEach((name) => {
          tabTemplate
          .clone()
          .removeAttr('id')
          .removeAttr('hidden')
          .children('a')
          .attr('href', `#tabs${name}`)
          .text(name)
          .parent()
          .insertBefore(tabTemplate);

          const newContent = contentTemplate
            .clone()
            .removeAttr('hidden')
            .attr('id', `tabs${name}`)
            .insertBefore(contentTemplate);

          obj[name].forEach((person, areaKey) => {
            addField(newContent, name, areaKey, person);
          });
        });
      }





    })





    $("#tabs").tabs();



  });

});
