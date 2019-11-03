import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/site/components';

export default function Home() {
  return (
    <Layout className="spfx-page-home">
      <div className="spfx-container">
        <div className="spfx-home-header">
          <h2 className="spfx-home-header-title">TEN<br />DESIGN</h2>
          <p>TEN是从腾讯各个部门业务生长出的前端/设计解决方案</p>
        </div>
        <div className="spfx-home-item spfx-home-item--card">
          <h4 className="spfx-home-item-title">根植于腾讯体系的TEN</h4>
          <p className="spfx-home-item-state">
            TEN包括设计资产和工具，资产由多个行业的解决方案组成，它包括设计资源，组件代码，行业知识，业务逻辑等。工具承载了资产工具化的诉求，目的是提高生产效率。
          </p>
          <div className="spfx-home-item-detail">
            <img className="spfx-home-item-detail-img" src={require("@/site/styles/images/frame-img.png")} />
          </div>
        </div>
        <div className="spfx-home-item">
          <h4 className="spfx-home-item-title">价值观</h4>
          <p className="spfx-home-item-state">
            明确的价值观，是指导设计的重要依据
      </p>
          <ul className="spfx-home-item-detail">
            <li>
              <img className="spfx-home-item-detail-img" src={require("@/site/styles/images/group-1.png")} />
              <h5 className="spfx-home-item-detail-title">生长</h5>
              <p className="spfx-home-item-detail-state">
                认知高效，操作高效，界面层级清晰，无多余元素，主要操作聚焦且直接，让用户快速识别操作而非通过记忆。
          </p>
            </li>
            <li>
              <img className="spfx-home-item-detail-img" src={require("@/site/styles/images/group-2.png")} />
              <h5 className="spfx-home-item-detail-title">不动</h5>
              <p className="spfx-home-item-detail-state">
                体系内的控件和代码标准化，任务是唯一的，不建议多任务操作，保持操作的稳定性。
          </p>
            </li>
            <li>
              <img className="spfx-home-item-detail-img" src={require("@/site/styles/images/group-3.png")} />
              <h5 className="spfx-home-item-detail-title">体系</h5>
              <p className="spfx-home-item-detail-state">
                保证基础体验一致，满足不同业务线可持续的扩展。同类产品的类似页面及组件，抽象得到标准化的内容。
          </p>
            </li>
          </ul>
        </div>
        <div className="spfx-home-item spfx-home-item--three">
          <h4 className="spfx-home-item-title">腾讯DNA的设计资产</h4>
          <p className="spfx-home-item-state">
            起源于腾讯业务，总结出带有业务逻辑的设计资产
      </p>
          <ul className="spfx-home-item-detail">
            <li>
              <img className="spfx-home-item-detail-img" src={require("@/site/styles/images/system-1.png")} />
              <h5 className="spfx-home-item-detail-title">设计资源</h5>
              <p className="spfx-home-item-detail-tips">适用人群：设计师</p>
              <p className="spfx-home-item-detail-state">
                设计资源，包括UIKit、基础组件、页面模板。设计师可以根据设计资源快速的搭建自己产品。
          </p>
            </li>
            <li>
              <img className="spfx-home-item-detail-img" src={require("@/site/styles/images/system-2.png")} />
              <h5 className="spfx-home-item-detail-title">设计指南</h5>
              <p className="spfx-home-item-detail-tips">适用人群：设计师</p>
              <p className="spfx-home-item-detail-state">
                设计指南可以保证在设计过程和开发过程中，设计、开发、产品之间的一致性及团队合作效率。
          </p>
            </li>
            <li>
              <img className="spfx-home-item-detail-img" src={require("@/site/styles/images/system-3.png")} />
              <h5 className="spfx-home-item-detail-title">组件库</h5>
              <p className="spfx-home-item-detail-tips">适用人群：前端工程师</p>
              <p className="spfx-home-item-detail-state">
                组件库是基于TEN Design设计体系，提供了开箱即用的Vue和React版本。
          </p>
            </li>
          </ul>
          <Link to="/assets"><button className="spfx-home-btn">设计资产</button></Link>
        </div>
        <div className="spfx-home-item">
          <h4 className="spfx-home-item-title">工具使设计资产落地更高效</h4>
          <p className="spfx-home-item-state">
            在保证质量以及品牌个性的同时，能高效的产出前端代码
      </p>
          <div className="spfx-home-item-detail">
            <img className="spfx-home-item-detail-img" src={require("@/site/styles/images/tool-img.png")} />
            <div className="spfx-home-item-detail-content">
              <h5>主题配置工具快速构建企业个性品牌库</h5>
              <p className="spfx-home-item-detail-state">
                为腾讯生态的企业定制，符合腾讯整体品牌，支持灵活的样式定制，简易生成多种风格，满足个性化产品需求。
          </p>
              <p className="spfx-home-item-detail-state">
                适用人群：前端工程师
          </p>
            </div>
          </div>
          <Link to="/"><button className="spfx-home-btn">使用工具</button></Link>
        </div>
      </div>
    </Layout>
  );

}
