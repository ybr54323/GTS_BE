'use strict';
const BaseController = require('./baseController');
async function findGoodListByNodeId(nodeId) {
  // eslint-disable-next-line no-undef
  return await app.Sequelize.query(
    `
      select distinct g.* from goods as g
      inner join nodes_goods as n_g on
      n_g.node_id = :nodeId and n_g.is_delete = 0
      where g.is_delete = 0 order by g.created_at desc
      `, {
      nodeId,
    }) || [];
}

class NodeController extends BaseController {

  async create() {
    const { ctx } = this;
    const { name } = ctx.permitAndValidateParams({
      name: {
        type: 'string',
        required: true,
      },
    });
    const node = await ctx.model.User.create({ name });
    if (!node.id) return this.fail({ msg: '创建节点失败' });
    const link = await ctx.model.UserNode.create({
      userId: ctx.session.user.id,
      nodeId: node.id,
    });
    if (link.id) return this.success({ msg: '创建节点成功' });
    this.fail({ msg: '创建节点失败' });
  }

  async del() {
    const { ctx } = this;
    const { nodeId } = ctx.permitAndValidateParams({
      nodeId: {
        type: 'string',
        required: true,
      },
    });
    await ctx.model.Node.update({ isDelete: 1 }, {
      id: nodeId,
    });
    await ctx.mode.UserNode.update({ isDelete: 1 }, {
      where: {
        nodeId,
      },
    });
    this.success({ data: '删除节点成功' });
  }

  async listByUserId() {
    const { app, ctx } = this;
    const temNodeList = await app.Sequelize.query(
      `
      select distinct n.* from nodes as n
      inner join users_nodes as u_n on
      u_n.user_id = :userId and u_n.is_delete = 0
      where n.is_delete = 0 order by n.created_at desc 
      `, {
        userId: ctx.session.user.id,
      }
    );
    const nodeList = [ ...temNodeList ].map(async n => {
      const tar = {};
      tar.childNodeList = await ctx.model.Node.findAll({
        where: {
          parentId: n.id,
          isDelete: 0,
        },
      });
      tar.goodList = await findGoodListByNodeId(n.id);
    });
    this.success({ data: {
      nodeList,
    } });
  }

  // 要校验
  async detail() {
    const { ctx } = this;
    const { nodeId } = ctx.permitAndValidateParams({
      nodeId: {
        type: 'string',
        required: true,
      },
    });
    const childNodeList = await ctx.model.Node.findAll({
      where: {
        parentId: nodeId,
        isDelete: 0,
      },
    });
    const goodList = await findGoodListByNodeId(nodeId);
    this.success({ data: {
      childNodeList,
      goodList,
    } });
  }
}

module.exports = NodeController;
