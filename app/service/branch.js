'use strict';

module.exports = app => {
  return class Branch extends app.Service {
    * add(branch){
      return yield this.ctx.model.Branch.create(branch);
    }
    *edit(data){
      const {id,branch}=data;
      return yield this.ctx.model.Branch.update({branch},{
        where:{
          id
        }
      });
    }
    *find(id){
      return yield this.ctx.model.Branch.findById(id);
    }
    *list(){
      return yield this.ctx.model.Branch.findAll(); 
    }
  };
};
