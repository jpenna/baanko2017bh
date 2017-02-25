
$(document).ready(() => {

  firebase.database().ref('1').once('value').then(function(snapshot) {
    var content = snapshot.val();
    
    const tabSample = $('#tabSample');
    const contentSample = $('#contentSample');
    const mediaSample = $('#mediaSample');

    content.forEach((obj, key) => {
      if (key != 0) {
        Object.keys(obj).forEach((name) => {
          tabSample
          .clone()
          .removeAttr('id')
          .removeAttr('hidden')
          .children('a')
          .attr('href', `#tabs${key}`)
          .text(name)
          .parent()
          .insertBefore(tabSample);

          const newContent = contentSample
          .clone()
          .removeAttr('hidden')
          .attr('id', `tabs${key}`)
          .insertBefore(contentSample);

          obj[name].forEach((person, areaKey) => {
            console.log(person);

            const newMedia = mediaSample
              .clone()
              .removeAttr('id')
              .removeAttr('hidden')
              .find('input[name=nome]').val(person.nome).end()
              .find('input[name=empresa]').val(person.empresa).end()
              .find('input[name=data]').val(person.data).end()
              .find('input[name=foto]').val(person.foto).end()
              .find('input[name=facebook]').val(person.facebook).end()
              .find('input[name=linkedin]').val(person.linkedin).end()
              .appendTo(newContent);

            const form = newMedia.find('form');
            form.attr('id', `form${name}${areaKey}`);
            form.on('submit', (e) => {
              e.preventDefault();

              var inputs = form.find('input');
              console.log(inputs);

              // not sure if you wanted this, but I thought I'd add it.
              // get an associative array of just the values.
              var values = {};
              inputs.each(function() {
                values[this.name] = $(this).val();
              });

              content[key][name][areaKey] = values;

              const newPostKey = firebase.database().ref().child('1').push().key;
              var updates = {};
              updates['/1/testando/' + newPostKey] = values;
              return firebase.database().ref(`/1/1/${name}/${areaKey}`).set(values);
            });

          });


        });




      }
    })





    $("#tabs").tabs();



  });

});
