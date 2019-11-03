import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/site/components';
import { request } from 'http';

export default function Assets() {
  return (
    <Layout className="spfx-page-assets" name="首页-设计资产" log>
      <div className="spfx-container">
        <div className="spfx-assets-header">
          <div className="spfx-assets-header-left" >
            <h2 className="spfx-assets-header-title">基于腾讯产品体系的设计资产</h2>
            <p className="spfx-assets-header-subhead">包括设计指南 | 设计资源 | 组件库</p>
            <p className="spfx-assets-header-detail">目前我们已搭建企业中后台设计资产。政务小程序，官网等设计资产正在建设中,欢迎大家一起共创。</p>
          </div>
        </div>
        <div className="spfx-assets-item spfx-assets-item--card">
          <h4 className="spfx-assets-item-title">根植于业务</h4>
          <p className="spfx-assets-item-state">
          Ten Design从各个业务提炼汲取养分，提炼总结，形成各个行业领域的设计资产
          </p>
          <div className="spfx-assets-item-detail">
            <img className="spfx-assets-item-detail-img" src={require("@/site/styles/images/frame-img.png")} />
          </div>
        </div>
        <div className="spfx-assets-item">
          <h3 className="spfx-assets-item-title">设计指南</h3>
          <p className="spfx-assets-item-detail">设计指南可以保证设计和开发过程中的一致性，提升整个团队的合作效率</p>
          <div className="spfx-assets-item-body">
            {/* <div className="spfx-assets-item-left">
              <div className="spfx-assets-item-det">
                <img src={require("@/site/styles/images/assets-item1-1.png")} />
                <img src={require("@/site/styles/images/assets-item1-2.png")} />
                <img src={require("@/site/styles/images/assets-item1-3.png")} />
              </div>
              <p className="spfx-assets-item-name">政务小程序（建设中）</p>
            </div>
            <div className="spfx-assets-item-center">
              <div className="spfx-assets-item-det">
                <img className="spfx-assets-item-img-center" src={require("@/site/styles/images/assets-item1-4.png")} />
              </div>
              <p className="spfx-assets-item-name">企业中后台系统</p>
            </div>
            <div className="spfx-assets-item-right">
             <div className="spfx-assets-item-det">
                <img src={require("@/site/styles/images/assets-item1-8.png")} />
              </div>
              <p className="spfx-assets-item-name">官网系统（建设中）</p>
            </div> */}
            <img className="one-img" src={require("@/site/styles/images/assets-item1.png")}/>
          </div>
          <div className="spfx-assets-btn-box">
            <Link to="/design"><button className="spfx-assets-btn">查看设计指南</button></Link>
          </div>
        </div> 
        <div className="spfx-assets-item spfx-assets-item--two">
          <h3 className="spfx-assets-item-title">设计资源</h3>
          <p className="spfx-assets-item-detail">设计资源包括UIKit，基础组件，页面模板。设计师可以根据需要利用设计资源快速搭建自己的产品</p>
          <div className="spfx-assets-item-body">
            <div className="spfx-assets-item-det">
              <img src={require("@/site/styles/images/assets-item2-1.png")} />
              <div className="spfx-assets-item-det-txt">
                <h4>控件普适</h4>
                <p className="spfx-assets-item-detail">提供的控件可以适用在大部分的业务场景</p>
              </div>
            </div>
            <div className="spfx-assets-item-det">
              <img src={require("@/site/styles/images/assets-item2-2.png")} />
              <div className="spfx-assets-item-det-txt">
                <h4>资源丰富</h4>
                <p className="spfx-assets-item-detail">我们提供多种维度的设计资源，从基础控件到页面模板</p>
              </div>
            </div>
          </div>
          <div className="spfx-assets-btn-box">
            <Link to="/assets"><button className="spfx-assets-btn">下载UIKit</button></Link>
          </div>
        </div> 
        <div className="spfx-assets-item spfx-assets-item--two">
          <h3 className="spfx-assets-item-title">组件库</h3>
          <p className="spfx-assets-item-detail">组件库是基于Ten Design设计体系，提供了开箱即用的Vue和React版本</p>
          <div className="spfx-assets-item-body">
            <div className="spfx-assets-item-det">
              <img src={require("@/site/styles/images/assets-item3-1.png")} />
              <div className="spfx-assets-item-det-txt">
                <h4>灵活引入，接口易用</h4>
                <p className="spfx-assets-item-detail">提供多种引入方式，一步安装。简单易用的接口，让开发者轻松地使用</p>
              </div>
            </div>
            <div className="spfx-assets-item-det">
              <img src={require("@/site/styles/images/assets-item3-2.png")} />
              <div className="spfx-assets-item-det-txt">
                <h4>组件丰富，功能完善</h4>
                <p className="spfx-assets-item-detail">提供了30+基础组件、覆盖各类场景，组件特性丰富、满足各种功能需求</p>
              </div>
            </div>
          </div>
          <div className="spfx-assets-btn-box spfx-assets-btn-box--l">
            <Link to="/components"><button className="spfx-assets-btn">React of 企业中后台</button></Link>
            <a href="/components-vue"><button className="spfx-assets-btn">Vue of 企业中后台</button></a>
          </div>
        </div> 
        <div className="spfx-assets-item">
          <h3 className="spfx-assets-item-title">谁在使用</h3>
          <div className="spfx-assets-item-body">
            <img className="spfx-assets-item-logo" src={require("@/site/styles/images/assets-item4-1.png")} />
            <img className="spfx-assets-item-logo" src={require("@/site/styles/images/assets-item4-2.png")} />
            <img className="spfx-assets-item-logo" src={require("@/site/styles/images/assets-item4-3.png")} />
            <img className="spfx-assets-item-logo" src={require("@/site/styles/images/assets-item4-4.png")} />
          </div>
          <p className="spfx-assets-item-detail">如果你想使用Ten Design，需要得到我们的支持，欢迎企业微信联系clarenli&nbsp;;&nbsp;tattyshang</p>
        </div> 
      </div>
    </Layout>
  );

}
