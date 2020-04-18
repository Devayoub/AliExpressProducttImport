/* eslint-disable max-len */
/*
* Test data for all resources
*/
const merge = require('merge-deep');
const moment = require('moment');
const Jod = require('./jod');
const httpStatus = require('http-status');

const EID_LENGTH = 45;
const VALID_IDS = [1, 10, 100, 1000, 10000];
const VALID_STR = ['Jason', 'Swimming', 'Development', 'China', 'Direct'];
const VALID_EIDS = ['EID001', 'EID002', 'EID003', 'EID004', 'EID005'];
const VALID_DATE = ['2019-07-07T12:05:00.000Z', '2019-07-08T12:05:00.000Z'];
const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 20;
module.exports.DEFAULT_PAGE = DEFAULT_PAGE;
module.exports.DEFAULT_PAGE_SIZE = DEFAULT_PAGE_SIZE;

const Criteria = {
  page: DEFAULT_PAGE,
  pageSize: DEFAULT_PAGE_SIZE,
  query: VALID_STR[0]
};
const Activity = {
  criteria: merge(Criteria),
  createIds: {
    compId: VALID_IDS[0],
    subCompId: VALID_IDS[1],
    levelId: VALID_IDS[2]
  },
  getIds: {
    compId: VALID_IDS[0],
    subCompId: VALID_IDS[1],
    levelId: VALID_IDS[2],
    activityId: VALID_IDS[3]
  },
  payload: {
    name: VALID_STR[0],
    skillAcquired: VALID_STR[1],
    lifeExperience: VALID_STR[2],
    updatedBy: VALID_EIDS[0]
  }
};

module.exports.Activities = {
  createBody: () => ({
    ids: Activity.createIds,
    payload: Activity.payload
  }),
  getBody: () => ({
    ids: Activity.getIds,
    currentUserEID: VALID_EIDS[0]
  }),
  updateBody: () => ({
    ids: Activity.getIds,
    payload: Activity.payload
  }),
  removeBody: () => ({
    ids: Activity.getIds,
    currentUserEID: VALID_EIDS[0]
  }),
  searchBody: () => ({
    ids: Activity.createIds,
    criteria: Activity.criteria,
    currentUserEID: VALID_EIDS[0]
  })
};

module.exports.Authentication = {
  loginBody: () => ({
    payload: {
      username: VALID_STR[0],
      password: VALID_STR[1]
    }
  })
};

module.exports.Competency = {
  createBody: () => ({
    payload: {
      name: VALID_STR[0],
      description: VALID_STR[1],
      updatedBy: VALID_EIDS[0]
    }
  }),
  searchBody: () => ({
    criteria: Criteria,
    currentUser: {}
  }),
  getBody: () => ({
    id: VALID_IDS[0],
    currentUserEID: VALID_EIDS[0]
  }),
  updateBody: () => ({
    id: VALID_IDS[0],
    payload: {
      name: VALID_STR[0],
      description: VALID_STR[1],
      updatedBy: VALID_EIDS[0]
    }
  }),
  removeBody: () => ({
    id: VALID_IDS[0],
    currentUserEID: VALID_EIDS[0]
  })
};

module.exports.CompletedActivities = {
  markLevelAsCompletedBody: () => ({
    employeeEID: VALID_EIDS[0],
    payload: {
      levelId: VALID_IDS[0]
    },
    currentUserEID: VALID_EIDS[1]
  }),
  markActivityAsCompletedBody: () => ({
    employeeEID: VALID_EIDS[0],
    payload: {
      activityId: VALID_IDS[0]
    },
    currentUserEID: VALID_EIDS[1]
  }),
  associateEmployeeToActivityBody: () => ({
    employeeEID: VALID_EIDS[0],
    payload: {
      activityId: VALID_IDS[0]
    },
    currentUserEID: VALID_EIDS[1]
  }),
  searchBody: () => ({
    employeeEID: VALID_EIDS[0],
    criteria: Criteria,
    currentUserEID: VALID_EIDS[1]
  }),
  removeBody: () => ({
    employeeEID: VALID_EIDS[0],
    activityId: VALID_IDS[0],
    currentUserEID: VALID_EIDS[1]
  })
};

module.exports.Country = {
  createBody: () => ({
    payload: {
      name: VALID_STR[0],
      updatedBy: VALID_EIDS[0]
    }
  }),
  searchBody: () => ({
    criteria: Criteria
  }),
  getBody: () => ({
    id: VALID_IDS[0]
  }),
  updateBody: () => ({
    id: VALID_IDS[0],
    payload: {
      name: VALID_STR[0],
      updatedBy: VALID_EIDS[0]
    }
  }),
  removeBody: () => ({
    id: VALID_IDS[0]
  })
};

module.exports.Division = {
  createBody: () => ({
    payload: {
      name: VALID_STR[0],
      updatedBy: VALID_EIDS[0]
    }
  }),
  searchBody: () => ({
    criteria: Criteria
  }),
  getBody: () => ({
    id: VALID_IDS[0]
  }),
  updateBody: () => ({
    id: VALID_IDS[0],
    payload: {
      name: VALID_STR[0],
      updatedBy: VALID_EIDS[0]
    }
  }),
  removeBody: () => ({
    id: VALID_IDS[0]
  })
};

module.exports.CompletedLevels = {
  createBody: () => ({})
};

module.exports.Employee = {
  createBody: () => ({
    payload: {
      EID: VALID_EIDS[0],
      name: VALID_STR[0],
      country: VALID_STR[1],
      division: VALID_STR[2],
      subGroup: VALID_STR[3],
      profile: VALID_STR[4],
      managerEID: VALID_EIDS[1],
      updatedBy: VALID_EIDS[2]
    }
  }),
  searchBody: () => ({
    criteria: {
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      competency: VALID_IDS[0],
      currentMaturity: VALID_IDS[1],
      expectedMaturity: VALID_IDS[2],
      subCompetency: VALID_IDS[3],
      country: VALID_STR[0],
      division: VALID_STR[1],
      subGroup: VALID_STR[2],
      profile: VALID_STR[3],
      managerEID: VALID_EIDS[0],
      query: VALID_STR[4]
    }
  }),
  getBody: () => ({
    EID: VALID_EIDS[0]
  }),
  updateBody: () => ({
    EID: VALID_EIDS[0],
    payload: {
      name: VALID_STR[0],
      country: VALID_STR[1],
      division: VALID_STR[2],
      subGroup: VALID_STR[3],
      profile: VALID_STR[4],
      managerEID: VALID_EIDS[1],
      updatedBy: VALID_EIDS[2]
    }
  }),
  removeBody: () => ({
    EID: VALID_EIDS[0]
  }),
  importEmployeeCoursesBody: () => ({
    payload: [{
      eid: VALID_STR[0],
      employeeName: VALID_STR[1],
      assignmentDate: VALID_STR[2],
      assignmentDueDate: VALID_STR[3],
      assignmentState: VALID_STR[4],
      assignmentType: VALID_STR[0],
      businessGroup: VALID_STR[1],
      code: VALID_STR[2],
      country: VALID_STR[3],
      courseName: VALID_STR[4],
      hireDate: VALID_STR[0],
      email: VALID_STR[1],
      manager: VALID_STR[2],
      primaryJob: VALID_STR[3],
      region: VALID_STR[4]
    }],
    currentUserEID: VALID_EIDS[0]
  })
};

module.exports.EmployeeSubCompetency = {
  createBody: () => ({
    employeeEID: VALID_EIDS[0],
    payload: {
      competencyId: VALID_IDS[0],
      subCompetencyId: VALID_IDS[1],
      currentMaturity: VALID_IDS[2],
      expectedMaturity: VALID_IDS[3],
      updatedBy: VALID_EIDS[1]
    }
  }),
  getBody: () => ({
    competencyId: VALID_IDS[0],
    subCompetencyId: VALID_IDS[1],
    currentUserEID: VALID_EIDS[0]
  }),
  getSubCompetencyBody: () => ({
    EID: VALID_EIDS[0]
  }),
  updateBody: () => ({
    employeeEID: VALID_EIDS[0],
    payload: {
      competencyId: VALID_IDS[0],
      subCompetencyId: VALID_IDS[1],
      currentMaturity: VALID_IDS[2],
      expectedMaturity: VALID_IDS[3],
      updatedBy: VALID_EIDS[1]
    }
  }),
  removeBody: () => ({
    employeeEID: VALID_EIDS[0],
    subCompetencyId: VALID_IDS[1],
    currentUserEID: VALID_EIDS[0]
  }),
  importCSVBody: () => ({
    payload: [{
      competencyID: VALID_IDS[0],
      subCompetencyID: VALID_IDS[1],
      currentMaturity: VALID_IDS[2],
      expectedMaturity: VALID_IDS[3],
      country: VALID_STR[0],
      employeesEID: VALID_STR[1],
      division: VALID_STR[2],
      subGroup: VALID_STR[3],
      profile: VALID_STR[4],
      createdBy: VALID_STR[0],
      updatedBy: VALID_STR[1],
      createdAt: VALID_DATE[0],
      updatedAt: VALID_DATE[0],
      managersEID: VALID_STR[2],
      name: VALID_STR[3]
    }],
    currentUserEID: VALID_EIDS[0]
  })
};

module.exports.Logs = {
  createBody: () => ({
    payload: {
      objectId: VALID_EIDS[0],
      objectName: VALID_STR[0],
      objectType: VALID_STR[1],
      userEID: VALID_EIDS[1],
      userName: VALID_STR[2],
      operation: VALID_STR[3]
    }
  }),
  searchBody: () => ({
    criteria: Criteria
  })
};

module.exports.Profile = {
  createBody: () => ({
    payload: {
      name: VALID_STR[0],
      updatedBy: VALID_EIDS[0]
    }
  }),
  searchBody: () => ({
    criteria: Criteria
  }),
  getBody: () => ({
    id: VALID_IDS[0]
  }),
  updateBody: () => ({
    id: VALID_IDS[0],
    payload: {
      name: VALID_STR[0],
      updatedBy: VALID_EIDS[0]
    }
  }),
  removeBody: () => ({
    id: VALID_IDS[0]
  })
};

module.exports.Statistics = {
  searchBody: () => ({
    criteria: {
      competencyId: VALID_IDS[0],
      subCompetencyId: VALID_IDS[1],
      country: VALID_STR[0],
      division: VALID_STR[1],
      subGroup: VALID_STR[2],
      profile: VALID_STR[3]
    },
    currentUser: {}
  })
};

module.exports.SubCompetencies = {
  createBody: () => ({
    ids: {
      compId: VALID_IDS[0]
    },
    payload: {
      name: VALID_STR[0],
      description: VALID_STR[1],
      updatedBy: VALID_EIDS[0]
    }
  }),
  searchBody: () => ({
    ids: {
      compId: VALID_IDS[0]
    },
    criteria: Criteria,
    currentUser: {}
  }),
  getBody: () => ({
    ids: {
      compId: VALID_IDS[0],
      subCompId: VALID_IDS[1]
    },
    currentUserEID: VALID_EIDS[0]
  }),
  updateBody: () => ({
    ids: {
      compId: VALID_IDS[0],
      subCompId: VALID_IDS[1]
    },
    payload: {
      name: VALID_STR[0],
      description: VALID_STR[1],
      updatedBy: VALID_EIDS[0]
    }
  }),
  removeBody: () => ({
    ids: {
      compId: VALID_IDS[0],
      subCompId: VALID_IDS[1]
    },
    currentUserEID: VALID_EIDS[0]
  })
};

module.exports.SubCompetencyLevel = {
  createBody: () => ({
    ids: {
      compId: VALID_IDS[0],
      subCompId: VALID_IDS[1]
    },
    payload: {
      level: VALID_IDS[2],
      name: VALID_STR[0],
      description: VALID_STR[1],
      updatedBy: VALID_EIDS[0]
    }
  }),
  searchBody: () => ({
    ids: {
      compId: VALID_IDS[0],
      subCompId: VALID_IDS[1]
    },
    criteria: Criteria,
    currentUserEID: VALID_EIDS[0]
  }),
  getBody: () => ({
    ids: {
      compId: VALID_IDS[0],
      subCompId: VALID_IDS[1],
      levelId: VALID_IDS[2]
    },
    currentUserEID: VALID_EIDS[0]
  }),
  updateBody: () => ({
    ids: {
      compId: VALID_IDS[0],
      subCompId: VALID_IDS[1],
      levelId: VALID_IDS[2]
    },
    payload: {
      name: VALID_STR[0],
      description: VALID_STR[1],
      updatedBy: VALID_EIDS[0]
    }
  }),
  removeBody: () => ({
    ids: {
      compId: VALID_IDS[0],
      subCompId: VALID_IDS[1],
      levelId: VALID_IDS[2]
    },
    currentUserEID: VALID_EIDS[0]
  })
};

module.exports.SubGroup = {
  createBody: () => ({
    payload: {
      name: VALID_STR[0],
      updatedBy: VALID_EIDS[0]
    }
  }),
  searchBody: () => ({
    criteria: Criteria
  }),
  getBody: () => ({
    id: VALID_IDS[0]
  }),
  updateBody: () => ({
    id: VALID_IDS[0],
    payload: {
      name: VALID_STR[0],
      updatedBy: VALID_EIDS[0]
    }
  }),
  removeBody: () => ({
    id: VALID_IDS[0]
  })
};

module.exports.User = {
  createBody: () => ({
    payload: {
      EID: VALID_EIDS[0],
      name: VALID_STR[0],
      role: 'Manager',
      username: VALID_STR[2],
      password: VALID_STR[3],
      status: 'Active',
      updatedBy: VALID_EIDS[2],
      directorEID: VALID_EIDS[3]
    }
  }),
  searchBody: () => ({
    criteria: {
      page: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
      role: 'Manager',
      status: 'Active',
      query: VALID_STR[2]
    }
  }),
  getBody: () => ({
    EID: VALID_EIDS[0]
  }),
  updateBody: () => ({
    EID: VALID_EIDS[0],
    payload: {
      name: VALID_STR[0],
      role: 'Manager',
      username: VALID_STR[2],
      password: VALID_STR[3],
      status: 'Active',
      updatedBy: VALID_EIDS[2],
      directorEID: VALID_EIDS[3],
      deletedAt: null,
      userCompetency: VALID_STR[4]
    }
  }),
  removeBody: () => ({
    EID: VALID_EIDS[0],
    payload: {
      hardDelete: true,
      deletedBy: VALID_EIDS[2]
    }
  })
};

module.exports.EID_LENGTH = EID_LENGTH;
module.exports.BEFORE_TEST_START = moment().subtract(10, 'minutes');

module.exports.JodIdOptional = Jod.number().integer().positive().optional().data;
module.exports.JodIds = Jod.number().integer().positive().required().data;
module.exports.JodEids = Jod.string().max(EID_LENGTH).required().data;
module.exports.JodEidOptional = Jod.string().max(EID_LENGTH).optional().data;
module.exports.JodPage = Jod.number().integer().default(0).data;
module.exports.JodPageSize = Jod.number().integer().min(1).default(20).data;
module.exports.Criteria = Jod.object().keys().optional().data;
module.exports.CriteriaQuery = Jod.string().data;
module.exports.GENERATE_EID = 'generate-test-data';

module.exports.Error = {
  Unauthorized: 'Action is not allowed for anonymous!',
  Expired: 'Failed to authenticate jwt token.',
  NotAllow: 'You are not allowed to perform this action!',
  UserNotFound: 'User not found',
  ActivityNotFound: 'Activity not found',
  LevelNotFound: 'SubCompetencyLevel not found',
  SubCompNotFound: 'SubCompetency not found',
  CompetencyNotFound: 'Competency not found',
  EmployeeNotFound: 'Employee not found'
};

module.exports.HTTP_STATUS = {
  CREATE_SUCCESS: httpStatus.OK,
  DELETE_SUCCESS: httpStatus.OK
};
