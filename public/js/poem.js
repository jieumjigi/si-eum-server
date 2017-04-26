_.each($('#poemManager'), __(
  $,

  _('on', 'click', 'button.getPoemList', __(
    _.v('currentTarget'), $, _('closest', '.body'),
    _.all(
      $,
      __(
        _($.get, '/poem/getPoem'), _.v('items'),
        _.t('items', '\
            ul {{_.go(items, ', _.teach("item", "\
              li\
                span {{item.title}}\
                span {{item.contents}}\
            ") ,')}}\
          ')
      )
    ),
    function($body, html) {
      return $body.append(html)
    }
  )),

  _.c('.form.card'), $,
  _('on', 'click', 'button.submit', __(
    _.v('delegateTarget'), $,
    _('find', 'input, textarea'),
    _.reduce(function(obj, $inputs) {
      return obj[$inputs.name] = $inputs.value, obj;
    }, {}),
    _($.post, '/poem/addPoem/')
  ))

));