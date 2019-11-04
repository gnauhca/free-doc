import React from 'react';
import PropTypes from 'prop-types';
import SpfxDocTable from './doc-table';

const propColumns = [
  {
    title: '参数',
    key: 'name',
  },
  {
    title: '说明',
    key: 'description',
  },
  {
    title: '类型',
    key: 'type',
    render(props) {
      const type = props.row.type;

      return type === 'func' ? 
      (
        <div className="spfx-doc-table-params">
          {type}
          {
            props.row.param.map((param, i) => (
              <div key={i} className="spfx-doc-table-params__item">
                <span>@param {param.name}</span>
                {param.type && <span className="spfx-doc-table-params__item-type">{param.type}</span>}
                <span> - {param.description}</span>
              </div>
            ))
          }
        </div>
      ) : type;
    }
  },
  {
    title: '可选值',
    key: 'options',
  },
  {
    title: '默认值',
    key: 'defaultValue',
  },
];

const eventsColumns = [
  {
    title: '事件名',
    key: 'name',
  },
  {
    title: '说明',
    key: 'description',
  },
  {
    title: '参数',
    key: 'params',
    render(props) {
      const params = props.row.params;
      return (
        <div className="spfx-doc-table-params">
          {
            params.map((param, i) => (
              <div key={i} className="spfx-doc-table-params__item">
                <span>{param.name}</span>
                <span className="spfx-doc-table-params__item-type">{param.type}</span>
                <span>{param.description}</span>
              </div>
            ))
          }
        </div>
      );
    }
  },
];

class DocTables extends React.Component {
  static propTypes = {
    name: PropTypes.string,
    doc: PropTypes.object
  }

  getPropsData() {

    const props = this.props.doc.props;
    const rows = Object.keys(props).map(name => {
      const prop = props[name];
      let options = '-';
      const type = prop.type.name;
      let param = []

      if (prop.tags && prop.tags.ignore) {
        return false;
      }

      if (type === 'enum') {
        options = prop.type.value.map(v => v.value).join('|');
      }

      if (type === 'func' && prop.tags && prop.tags.param && prop.tags.param.length) {
        param = prop.tags.param;
      }

      return {
        name,
        description: prop.description,
        type,
        options,
        param,
        defaultValue: (prop.defaultValue && prop.defaultValue.value) || (prop.tags && prop.tags.defaultValue) || '-',
      };
    }).filter(row => row);

    return rows;
  }

  getMethodsData() {
    return this.props.doc.methods;
  }

  render() {
    const { name } = this.props;

    const propsData = this.getPropsData();
    const eventsData = this.getMethodsData();

    return (
      <div className="spfx-doc-tables">
        <h3>{name} 配置</h3>
        {
          propsData.length && 
          (
            <div className="spfx-doc-table-wrapper">
              <h4>props</h4>
              <SpfxDocTable columns={propColumns} data={propsData} />
            </div>
          )
        }
        {
          false && 
          (
            <div className="spfx-doc-table-wrapper">
              <h4>methods</h4>
              <SpfxDocTable columns={eventsColumns} data={eventsData} />
            </div>
          )
        }
      </div>
    );
  }
}

export default DocTables;
