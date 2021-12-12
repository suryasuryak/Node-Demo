const Sequelize = require('sequelize');
var sequelize=require('./connection');




var user=sequelize.define('user',{
    username:{
      type: Sequelize.STRING,
      primaryKey:true
    },
    password:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    role:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    }
},
{
      //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false
}

  );
  
  user.sync({force: false}).then(() => {  
    console.log("User table Synched!!!");
  });

  var employee=sequelize.define('employee',{
    employee_id:{
      type: Sequelize.NUMBER, 
      primaryKey:true
    },
    name:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    status:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    manager:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    wfm_manager:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    email:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    lockstatus:{
      type: Sequelize.TEXT,
      allowNull:false
    },
    experience:{
      type: Sequelize.NUMBER,
      allowNull:false
    },
},
{
      //don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // If don't want createdAt
  createdAt: false,

  // If don't want updatedAt
  updatedAt: false,
}
);

// employee.associate = models => {
//   employee.hasMany(skillmap);
// }
var skills=sequelize.define('skills',{
  skillid:{
    type: Sequelize.NUMBER, 
    primaryKey:true
  },
  name:{
    type: Sequelize.TEXT,
    allowNull:false
  },
},
{
  //don't add the timestamp attributes (updatedAt, createdAt)
timestamps: false,

// If don't want createdAt
createdAt: false,

// If don't want updatedAt
updatedAt: false
}
);

var skillmap=sequelize.define('skillmap',{
  employee_id:{
    type: Sequelize.NUMBER, 
    primaryKey:true,
      references: 'employee', // or "conversations"? This is a table name
      referencesKey: 'employee_id' 
  },
  skillid:{
    type: Sequelize.NUMBER,
    allowNull:false,
    references: {
      model: 'skills',
      key: 'skillid'
    }
  },
},
{
  //don't add the timestamp attributes (updatedAt, createdAt)
timestamps: false,

// If don't want createdAt
createdAt: false,

// If don't want updatedAt
updatedAt: false,

freezeTableName: true,

}
)
// skillmap.sync({force: false}).then(() => {  
//   console.log("Skill Map table Synched!!!");
// });
// skillmap.associate = models => {
//   skillmap.belongsto(employee, {
//     foreignKey:{
//       allowNull: false
//     }
//   });
// }

var softlock=sequelize.define('softlock',{
  employee_id:{
    type: Sequelize.NUMBER, 
  },
  manager:{
    type: Sequelize.STRING,
    allowNull:false
  },
  lastupdated:{
    type: Sequelize.DATE,
  },
  reqdate:{
    type: Sequelize.DATE,
  },
  status:{
    type: Sequelize.STRING,
  },
  lockid:{
    type: Sequelize.NUMBER,
    allowNull:false,
    autoIncrement: true,
    primaryKey: true
  },
  requestmessage:{
    type: Sequelize.TEXT,
  },
  managerstatus:{
    type: Sequelize.STRING,
  },
  mgrstatuscomment:{
    type: Sequelize.TEXT,
  },
  mgrlastupdate:{
    type: Sequelize.DATE,
  }
},
{
  //don't add the timestamp attributes (updatedAt, createdAt)
timestamps: false,

// If don't want createdAt
createdAt: false,

// If don't want updatedAt
updatedAt: false,

freezeTableName: true
// tableName: 'Employees'
})


employee.hasMany(skillmap, {
   foreignKey: 'employee_id'
});

skillmap.belongsTo(employee, {
     as: 'skillmaps',
     foreignKey: 'employee_id'
})

skills.hasMany(skillmap, {
  foreignKey: 'skillid'
});

skillmap.belongsTo(skills, {
    as: 'skills',
    foreignKey: 'skillid'
})

// skills.belongsTo(skillmap, {
//   as: 'skillmap'
//   // through: 'skillmap_skill'
// });

// skillmap.hasMany(skills, {
//   as: 'skillmap'
//   // through: 'skillmap_skill'
// })

// skills.belongsTo(employee, {   
//   foreignKey : {
//     name : "skillid",
//     allowNull: false
//   },
//   through: 'users_skills'
// });
// skillmap.belongsTo(skills, { 
//   foreignKey : {
//     name : "skillid",
//     allowNull: false
//   },
//   through: 'skillmap_skills'
// });
// skillmap.belongsTo(employee, { 
//   foreignKey : {
//     name : "employee_id",
//     allowNull: false
//   },
//   through: 'users_skills'
// });


// skills.belongsTo(skillmap, { 
//   foreignKey : {
//     name : "skillid",
//     allowNull: false
//   },
//   through: 'skillmap_skills'
// });

// skillmap.belongsToMany(skills, { through: 'skillmap_skills'});
// skills.belongsToMany(skillmap, { through: 'skills_skillmap'});

module.exports={user:user, employee: employee, skills: skills, skillmap: skillmap, softlock:softlock};