import { defineComponent, ref } from 'vue';
import ProTable from './ProTable.jsx';
// import { Table } from 'ant-design-vue';
import './index.less';

const Demo = defineComponent({
  setup() {
    const dataSource = ref([
      {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
        testHtml: '<div>testHtml</div>',
      },
      {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
        testHtml: '<div>testHtml</div>',
      },
    ]);

    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        summary: false,
        fixed: true,
        width: '100px',
        // canEditable: true,
        align: 'center',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        summary: true,
        summaryAppend: '￥',
        width: '100px',
        align: 'center',
      },
      {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        summary: false,
        width: '100px',
        align: 'center',
      },
      {
        title: 'testHtml',
        dataIndex: 'testHtml',
        key: 'testHtml',
        summary: false,
        width: '100px',
        isHtml: true,
        align: 'center',
      },
      {
        title: 'opration customRender',
        dataIndex: 'name',
        key: 'opration',
        summary: false,
        width: '100px',
        align: 'center',
        customRender: ({ record, index }) => {
          return (
            <div style={{ backgroundColor: '#e4e4e4' }}>
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

    return () => (
      <div>
        <ProTable
          // scroll={{ x: 2000 }}
          bordered
          scroll
          showFilter
          showSelection={false}
          v-model:dataSource={dataSource.value}
          v-model:columns={columns}
          // renderTitle={renderTitle}
          onDataChange={handleDataChange}
          v-slots={{
            title: renderTitle(),
          }}
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
