import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return(
      <form className="form-horizontal">
        <div className="form-group">
          <label for="inputTitle" className="col-sm-1 control-label">Título</label>
          <div className="col-sm-11">
            <input type="email" className="form-control" id="inputTitle" placeholder="Título" />
          </div>
        </div>
        <div className="form-group">
          <label for="inputPasaje" className="col-sm-1 control-label">Pasaje</label>
          <div className="col-sm-11">
            <input type="password" className="form-control" id="inputPasaje" placeholder="Pasaje" />
          </div>
        </div>
        <div className="form-group">
          <label for="textContenido" className="col-sm-1 control-label">Contenido</label>
          <div className="col-sm-11">
            <textarea className="form-control" id="textContenido" rows="10"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default pull-right">Guardar</button>
          </div>
        </div>
      </form>
    );
  }
});