import { FormSchema } from '/@/components/Form';

// const schemas: FormSchema[] = [
//   {
//     field: 'task-name',
//     component: 'Input',
//     label: '任务名称',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'task-no',
//     component: 'Input',
//     label: '任务编号',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'task-type',
//     component: 'Select',
//     label: '任务类型',
//     componentProps: {
//       options: [
//         {
//           label: '类型-1',
//           value: '1',
//           key: '1',
//         },
//         {
//           label: '类型-2',
//           value: '2',
//           key: '2',
//         },
//         {
//           label: '类型-3',
//           value: '3',
//           key: '3',
//         },
//       ],
//     },
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'executor',
//     component: 'Select',
//     label: '执行人',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'lead-dept',
//     component: 'TreeSelect',
//     label: '主办部门',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'weight',
//     component: 'Select',
//     label: '重要性',
//     componentProps: {
//       options: [
//         {
//           label: '重要',
//           value: '1',
//           key: '1',
//         },
//         {
//           label: '一般',
//           value: '2',
//           key: '2',
//         },
//         {
//           label: '轻微',
//           value: '3',
//           key: '3',
//         },
//       ],
//     },
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'plan-start-date',
//     component: 'DatePicker',
//     label: '计划开始',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'task-no',
//     component: 'DatePicker',
//     label: '计划结束',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'task-status',
//     component: 'Select',
//     label: '任务状态',
//     componentProps: {
//       options: [
//         {
//           label: '未开始',
//           value: '1',
//           key: '1',
//         },
//         {
//           label: '进行中',
//           value: '2',
//           key: '2',
//         },
//         {
//           label: '已完成',
//           value: '3',
//           key: '3',
//         },
//       ],
//     },
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: '[launch-time-s, launch-time-e]',
//     component: 'RangePicker',
//     label: '发起时间',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: '[done-time-s, done-time-e]',
//     component: 'RangePicker',
//     label: '结束时间',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'owner',
//     component: 'Select',
//     label: '负责人',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'switcher',
//     component: 'Switch',
//     label: '开关-整洁',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'related-object',
//     component: 'Cascader',
//     label: '关联对象',
//     componentProps: {
//       options: [
//         {
//           value: 'zhejiang',
//           label: 'Zhejiang',
//           children: [
//             {
//               value: 'hangzhou',
//               label: 'Hangzhou',
//               children: [
//                 {
//                   value: 'xihu',
//                   label: 'West Lake',
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           value: 'jiangsu',
//           label: 'Jiangsu',
//           children: [
//             {
//               value: 'nanjing',
//               label: 'Nanjing',
//               children: [
//                 {
//                   value: 'zhonghuamen',
//                   label: 'Zhong Hua Men',
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'number-wide',
//     component: 'InputNumber',
//     label: '数字-宽的',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'switcher-icon',
//     component: 'Switch',
//     label: '开关-符号',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'switcher-chars',
//     component: 'Switch',
//     label: '开关-文字',
//     componentProps: {
//       checkedChildren: '开',
//       unCheckedChildren: '关',
//     },
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'number-narrow',
//     component: 'InputNumber',
//     label: '数字-短的',
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'checkbox',
//     component: 'CheckboxGroup',
//     label: '复选方式',
//     defaultValue: '1',
//     componentProps: {
//       options: [
//         {
//           label: '选项1',
//           value: '1',
//           key: '1',
//         },
//         {
//           label: '选项2',
//           value: '2',
//           key: '2',
//         },
//         {
//           label: '选项3',
//           value: '3',
//           key: '3',
//         },
//       ],
//     },
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'radio',
//     component: 'RadioButtonGroup',
//     label: '单选方式',
//     defaultValue: '1',
//     componentProps: {
//       options: [
//         {
//           label: '选中项-1',
//           value: '1',
//           key: '1',
//         },
//         {
//           label: '选中项-2',
//           value: '2',
//           key: '2',
//         },
//         {
//           label: '选中项-3',
//           value: '3',
//           key: '3',
//         },
//       ],
//     },
//     colProps: {
//       span: 8,
//     },
//   },
//   {
//     field: 'markup-div',
//     component: 'Divider',
//     label: '备注',
//     colProps: {
//       span: 24,
//     },
//   },
//   {
//     field: 'markup',
//     component: 'InputTextArea',
//     label: '',
//     labelWidth: 0,
//     colProps: {
//       span: 24,
//     },
//   },
// ];

const schemas: FormSchema[] = [
  {
    field: 'demo-input',
    component: 'Input',
    label: '输入框',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-select',
    component: 'Select',
    label: '单选框',
    componentProps: {
      options: [
        {
          label: '一般任务',
          value: '1',
          key: '1',
        },
        {
          label: '加急任务',
          value: '2',
          key: '2',
        },
        {
          label: '紧急任务',
          value: '3',
          key: '3',
        },
      ],
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-select-multiple',
    component: 'Select',
    label: '多选框',
    componentProps: {
      mode: 'multiple',
      options: [
        {
          label: '王小飞',
          value: '1',
          key: '1',
        },
        {
          label: '钱丽丽',
          value: '2',
          key: '2',
        },
        {
          label: '宋小鹏',
          value: '3',
          key: '3',
        },
      ],
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-date-picker',
    component: 'DatePicker',
    label: '日期选择',
    colProps: {
      span: 8,
    },
  },
  {
    field: '[demo-date-picker-start, demo-date-picker-end]',
    component: 'RangePicker',
    label: '日期范围选择',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-time-picker',
    component: 'TimePicker',
    label: '时间选择',
    colProps: {
      span: 8,
    },
  },
  {
    field: '[demo-time-picker-start, demo-time-picker-end]',
    component: 'TimeRangePicker',
    componentProps: {
      placeholder: ['开始时间', '结束时间'],
    },
    label: '时间范围选择',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-tree',
    component: 'TreeSelect',
    label: '树状单择',
    componentProps: {
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',

          children: [
            {
              title: 'Child Node3',
              value: '0-1-0',
              disabled: true,
            },
            {
              title: 'Child Node4',
              value: '0-1-1',
            },
            {
              title: 'Child Node5',
              value: '0-1-2',
            },
          ],
        },
      ],
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-tree-multiple',
    component: 'TreeSelect',
    label: '树状多选',
    componentProps: {
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-0',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',

          children: [
            {
              title: 'Child Node3',
              value: '0-1-0',
              disabled: true,
            },
            {
              title: 'Child Node4',
              value: '0-1-1',
            },
            {
              title: 'Child Node5',
              value: '0-1-2',
            },
          ],
        },
      ],
      treeCheckable: true,
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-cascader',
    component: 'Cascader',
    label: '级联选择',
    componentProps: {
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          children: [
            {
              value: 'hangzhou',
              label: 'Hangzhou',
              children: [
                {
                  value: 'xihu',
                  label: 'West Lake',
                },
              ],
            },
          ],
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          children: [
            {
              value: 'nanjing',
              label: 'Nanjing',
              children: [
                {
                  value: 'zhonghuamen',
                  label: 'Zhong Hua Men',
                },
              ],
            },
          ],
        },
      ],
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-checkboxes',
    component: 'CheckboxGroup',
    label: '多选项',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'demo-radios',
    component: 'RadioGroup',
    label: '单选项',
    componentProps: {
      options: [
        {
          label: '选项1',
          value: '1',
        },
        {
          label: '选项2',
          value: '2',
        },
      ],
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'switcher',
    component: 'Switch',
    label: '开关-整洁',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'switcher-icon',
    component: 'Switch',
    label: '开关-符号（需要单独实现）',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'switcher-chars',
    component: 'Switch',
    label: '开关-文字',
    componentProps: {
      checkedChildren: '开',
      unCheckedChildren: '关',
    },
    colProps: {
      span: 8,
    },
  },
  {
    field: 'number-wide',
    component: 'InputNumber',
    label: '数字-宽的',
    colProps: {
      span: 8,
    },
  },
  {
    field: 'number-narrow',
    component: 'InputNumber',
    label: '数字-短的',
    colProps: {
      span: 8,
    },
  },
];

export default schemas;
