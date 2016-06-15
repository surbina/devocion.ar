import React from 'react';

export default React.createClass({
  render: function() {
    return(
      <form className="form-horizontal">
        <div className="form-group">
          <div className="col-sm-12">
            <input type="email" className="form-control" id="content" placeholder="Comentario"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default pull-right">Comentar</button>
          </div>
        </div>
      </form>
    );
  }
});