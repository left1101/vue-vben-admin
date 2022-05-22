import { defineComponent, ref } from 'vue';
import ProTable from './ProTable.jsx';
import './index.less';

const Demo = defineComponent({
  setup() {
    const tableList: any = [];
    for (let index = 1; index <= 50; index++) {
      tableList.push({
        key: `${index}`,
        name: `胡彦斌-${index}`,
        age: 32,
        address: '西湖区湖底公园1号',
        testHtml: '<div>testHtml</div>',
      });
    }
    const dataSource = ref(tableList);

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        summary: false,
        fixed: true,
        width: '150px',
        canEditable: true,
        align: 'center',
        filterFn: (column) => {
          console.log('filterFn column = ', column);
          return {
            type: 'input',
          };
        },
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        summary: true,
        canEditable: true,
        width: '150px',
        align: 'center',
        // renderSummary: (t) => {
        //   return <div>$ {t} 元</div>;
        // },
        renderFn: (num) => {
          return `<div">$ ${num} 元</div>`;
        },
        // summaryFn: (column) => {
        //   console.log('column = ', column);
        //   return 100;
        // },
        filterFn: (column) => {
          console.log('filterFn column = ', column);
          return {
            type: 'input',
          };
        },
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        summary: false,
        canEditable: true,
        width: '150px',
        align: 'center',
        filterFn: (column) => {
          console.log('filterFn column = ', column);
          return {
            type: 'select',
            selectList: ['test1', 'test2', 'test3'],
          };
        },
      },
      {
        title: 'testHtml',
        dataIndex: 'testHtml',
        key: 'testHtml',
        summary: false,
        width: '200px',
        isHtml: true,
        align: 'center',
        filterFn: (column) => {
          console.log('filterFn column = ', column);
          return {
            type: 'datepicker',
          };
        },
      },
      {
        title: 'opration customRender',
        dataIndex: 'name',
        key: 'opration',
        summary: false,
        width: '200px',
        fixed: 'right',
        align: 'center',
        customRender: ({ record, index }) => {
          return (
            <div
              style={{
                backgroundColor: '#e3e3e3',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {record.name}
              {index}
            </div>
          );
        },
      },
    ];

    // watch({

    // })

    const renderTitle = () => {
      console.log('renderTitle');
      return (
        <div>
          <span>renderTitle1</span>
        </div>
      );
    };

    // const expandedRowRender = () => {
    //   return (
    //     <div>
    //       <div>expandedRowRender</div>
    //     </div>
    //   );
    // };

    // const renderFooter = (currentPageData) => {
    //   console.log('currentPageData = ', currentPageData);
    //   return (
    //     <div>
    //       <div>统计</div>
    //       <div>￥185366.00</div>
    //       <div>￥185366.00</div>
    //       <div>￥185366.00</div>
    //     </div>
    //   );
    // };

    // const renderSummary = ({ pageData }) => {
    //   console.log('pageData = ', pageData);
    //   return (
    //     <Table.Summary fixed={true} class="summary">
    //       <Table.Summary.Row>
    //         <Table.Summary.Cell>总结</Table.Summary.Cell>
    //         <Table.Summary.Cell colSpan={2}>Table.Summary.Row</Table.Summary.Cell>
    //       </Table.Summary.Row>
    //     </Table.Summary>
    //   );
    // };

    const handleDataChange = (item, row, column) => {
      console.log('item, row, column = ', item, row, column);
    };

    // const handleFilterClear = (query) => {
    //   console.log('handleFilterQuery query = ', query);
    // };

    const handleFilterClearAll = () => {
      console.log('handleFilterQuery');
    };

    const handleFilterQuery = (query) => {
      console.log('handleFilterQuery query = ', query);
    };

    return () => (
      <div>
        <ProTable
          scroll={{
            y: 300,
            x: 800,
          }}
          bordered
          showFilter={true}
          // showSelection={true}
          // summaryPosition="top"
          v-model:dataSource={dataSource.value}
          v-model:columns={columns}
          // renderTitle={renderTitle}
          onDataChange={handleDataChange}
          v-slots={{
            title: renderTitle(),
          }}
          // onFilterClear={handleFilterClear}
          onFilterClearAll={handleFilterClearAll}
          onFilterQuery={handleFilterQuery}
          // renderBodyCell={renderBodyCell}
          // renderHeaderCell={renderHeaderCell}
          // rendercustomFilterDropdown
          // expandedRowRender={expandedRowRender}
          // renderFooter={renderFooter}
          // renderSummary={renderSummary}
        />
      </div>
    );
  },
});

export default Demo;
