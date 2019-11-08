export const config = [
  {
    entity: 'team',
    table: {
      columns: [
        {
          name: 'event',
          required: true,
          label: 'Event',
          align: 'center',
          field: 'event',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Name team',
          field: 'name',
          sortable: true
        },
        {
          name: 'university',
          align: 'center',
          label: 'University',
          field: 'university',
          sortable: true
        }
      ],
      visibleColumns: [
        'event',
        'name',
        'university'
      ]
    }
  },
  {
    entity: 'competitors',
    table: {
      column: [
        {
          name: 'university',
          align: 'center',
          label: 'University',
          field: 'university',
          sortable: true
        },
        {
          name: 'name',
          align: 'center',
          label: 'Name team',
          field: 'name',
          sortable: true
        },
        {
          name: 'lastName',
          align: 'center',
          label: 'Last Name',
          field: 'lastName',
          sortable: true
        },
        {
          name: 'competitorType',
          align: 'center',
          label: 'Type of competitor',
          field: 'competitorType',
          sortable: true
        }
      ],
      visibleColumns: [
        'lastname',
        'name',
        'university'
      ]
    }
  }
]

export const users = {
  entity: 'users',
  table: {
    column: [
      {
        name: 'name',
        align: 'center',
        label: 'Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'lastname',
        align: 'center',
        label: 'Last Name',
        field: 'lastname',
        sortable: true
      },
      {
        name: 'rols',
        align: 'center',
        label: 'Rols',
        field: 'rols',
        sortable: true
      },
      {
        name: 'email',
        align: 'center',
        label: 'Email',
        field: 'email',
        sortable: true
      },
      {
        name: 'user',
        align: 'center',
        label: 'User',
        field: 'user',
        sortable: true
      },
      {
        name: 'edit',
        align: 'center',
        label: 'Edit',
        field: 'edit',
        sortable: true
      }
    ],
    visibleColumns: [
      'name',
      'lastname',
      'rols',
      'email',
      'user',
      'edit'
    ]
  },
  modelsUsers: {
    name: {
      value: null,
      validate: true
    },
    lastname: {
      value: null,
      validate: true
    },
    rols: {
      value: null,
      validate: true
    },
    email: {
      value: null,
      validate: true
    },
    user: {
      value: null,
      validate: true
    },
    password: {
      value: null,
      validate: true
    },
    created_by: {
      value: 'Ramon teran',
      validate: false
    },
    updated_by: {
      value: 'ramon teran',
      validate: false
    }
  }
}

export const events = {
  entity: 'event',
  table: {
    column: [
      {
        name: 'name',
        align: 'center',
        label: 'Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'organizer',
        align: 'center',
        label: 'Organizer',
        field: 'organizer',
        sortable: true
      },
      {
        name: 'address',
        align: 'center',
        label: 'Address',
        field: 'address',
        sortable: true
      },
      {
        name: 'dateEvent',
        align: 'center',
        label: 'Data event',
        field: 'dateEvent'
      },
      {
        name: 'done',
        align: 'center',
        label: 'Active/inactive',
        field: 'done'
      },
      {
        name: 'edit',
        align: 'center',
        label: 'Edit',
        field: 'edit'
      },
      {
        name: 'created_by',
        align: 'center',
        label: 'Created by',
        field: 'created_by'
      },
      {
        name: 'updated_by',
        align: 'center',
        label: 'Updated by',
        field: 'updated_by'
      }
    ],
    visibleColumns: [
      'name',
      'organizer',
      'address',
      'dateEvent',
      'done',
      'edit'
    ]
  },
  modelsAddEvents: {
    name: {
      value: null,
      validate: true
    },
    organizer: {
      value: null,
      validate: true
    },
    address: {
      value: null,
      validate: true
    },
    dateEvent: {
      value: null,
      validate: true
    },
    done: {
      value: false,
      validate: false
    },
    created_by: {
      value: 'luis palma',
      validate: false
    },
    updated_by: {
      value: 'luis palma',
      validate: false
    }
  }
}
export const teams = {
  entity: 'teams',
  table: {
    column: [
      {
        name: 'eventId',
        align: 'center',
        label: 'Events',
        field: 'eventId',
        sortable: true
      },
      {
        name: 'name',
        align: 'center',
        label: 'Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'University',
        align: 'center',
        label: 'University',
        field: 'University',
        sortable: true
      },
      {
        name: 'edit',
        align: 'center',
        label: 'Edit',
        field: 'edit',
        sortable: true
      },
      {
        name: 'created_by',
        align: 'center',
        label: 'Created by',
        field: 'created_by'
      },
      {
        name: 'updated_by',
        align: 'center',
        label: 'Updated by',
        field: 'updated_by'
      }
    ],
    visibleColumns: [
      'eventId',
      'name',
      'University',
      'edit'
    ]
  },
  modelTeams: {
    eventId: {
      value: null,
      validate: true
    },
    name: {
      value: null,
      validate: true
    },
    university: {
      value: null,
      validate: true
    },
    created_by: {
      value: 'Ramon teran',
      validate: false
    },
    updated_by: {
      value: 'ramon teran',
      validate: false
    }
  }
}

export const confrontations = {
  entity: 'confrontations',
  table: {
    column: [
      {
        name: 'phaseId',
        align: 'center',
        label: 'Phase',
        field: 'phaseId',
        sortable: true
      },
      {
        name: 'teamA',
        align: 'center',
        label: 'Team A',
        field: 'teamA',
        sortable: true
      },
      {
        name: 'teamB',
        align: 'center',
        label: 'Team B',
        field: 'teamB',
        sortable: true
      },
      {
        name: 'TeamA',
        align: 'center',
        label: 'Team A',
        field: 'TeamA',
        sortable: true
      },
      {
        name: 'TeamB',
        align: 'center',
        label: 'Team B',
        field: 'TeamB',
        sortable: true
      },
      {
        name: 'status',
        align: 'center',
        label: 'Status',
        field: 'status',
        sortable: true
      },
      {
        name: 'edit',
        align: 'center',
        label: 'Edit',
        field: 'edit',
        sortable: true
      }
    ],
    visibleColumns: [
      'phaseId',
      'TeamA',
      'TeamB',
      'status',
      'edit'
    ]
  },
  modelsConfrontations: {
    phaseId: {
      value: null,
      validate: true
    },
    teamA: {
      value: null,
      validate: true
    },
    teamB: {
      value: null,
      validate: true
    },
    status: {
      value: null,
      validate: true
    },
    created_by: {
      value: 'Ramon teran',
      validate: false
    },
    updated_by: {
      value: 'ramon teran',
      validate: false
    }
  }
}

export const universities = {
  entity: 'confrontations',
  table: {
    column: [
      {
        name: 'name',
        align: 'center',
        label: 'Name',
        field: 'name',
        sortable: true
      },
      {
        name: 'sortName',
        align: 'center',
        label: 'Sort Name',
        field: 'sortName',
        sortable: true
      },
      {
        name: 'university',
        align: 'center',
        label: 'Universities',
        field: 'university',
        sortable: true
      },
      {
        name: 'edit',
        align: 'center',
        label: 'Edit',
        field: 'edit',
        sortable: true
      }
    ],
    visibleColumns: [
      'name',
      'sortName',
      'university',
      'edit'
    ]
  },
  modelsUniversities: {
    name: {
      value: null,
      validate: true
    },
    sortName: {
      value: null,
      validate: true
    },
    university: {
      value: null,
      validate: true
    },
    logo: {
      value: null,
      validate: false
    },
    created_by: {
      value: 'Ramon teran',
      validate: false
    },
    updated_by: {
      value: 'ramon teran',
      validate: false
    }
  }
}
