import { defineComponent, reactive, ref, toRaw } from 'vue';
import { Table, Input, Tag } from 'ant-design-vue';
import { cloneDeep } from 'lodash-es';

const ProTable = defineComponent({
  props: [
    'dataSource',
    'renderSummary',
    'showFilter',
    'showSelection',
    'columns',
    'expandedRowRender',
    'renderFooter',
    'renderTitle',
    'onDataChange',
  ],
  setup(props: any, context: any) {
    const { slots, emit } = context;
    const editableData = reactive({});
    const inputRef = ref(null);
    const headerInfoTags = ref<any>([]);

    const edit = (row: string, dataIndex: string) => {
      editableData[`${row}-${dataIndex}`] = cloneDeep(
        props.dataSource.filter((item) => row === item.key)[0],
      );

      setTimeout(() => {
        if (inputRef.value && typeof inputRef.value.focus === 'function') {
          inputRef.value.focus();
        }
      }, 100);
    };

    const save = (row: string, dataIndex: string, index: number) => {
      const valueStr = editableData[`${row}-${dataIndex}`];
      const newItem = Object.assign(
        {},
        props.dataSource.filter((item) => row === item.key)[0],
        valueStr,
      );
      const newDataSource = [...toRaw(props.dataSource)];
      const idx = props.showFilter ? index - 1 : index;
      newDataSource.splice(idx, 1, newItem);
      console.log('newDataSource = ', newDataSource);

      emit('update:dataSource', newDataSource);
      if (props.onDataChange && typeof props.onDataChange === 'function') {
        props.onDataChange(valueStr, row, dataIndex);
      }

      delete editableData[`${row}-${dataIndex}`];
    };

    const handleClose = (item) => {
      const headerInfoTagsTmp = [...headerInfoTags.value];
      const idx = headerInfoTagsTmp.findIndex((i) => i.name === item.name);
      headerInfoTagsTmp.splice(idx, 1);
      headerInfoTags.value = headerInfoTagsTmp;
    };

    const handleClearAll = () => {
      headerInfoTags.value = [];
    };

    const renderTitle = () => {
      return (
        <div class="header-tags-wrap">
          <div class="header-tag-left">
            <span style={{ marginRight: '15px' }}>
              已选<span>{headerInfoTags.value.length}</span>项
            </span>
            {headerInfoTags.value.map((item: any) => {
              return (
                <Tag closable onClose={() => handleClose(item)}>
                  {item.name}
                </Tag>
              );
            })}
          </div>
          <div onClick={handleClearAll} style={{ cursor: 'pointer' }}>
            全部清空
          </div>
        </div>
      );
    };

    // const renderFooter = (currentPageData) => {
    //   if (props.renderFooter && typeof props.renderFooter === 'function') {
    //     return props.renderFooter(currentPageData);
    //   }

    //   return (
    //     <div>
    //       <span>renderFooter</span>
    //     </div>
    //   );
    // };

    // const expandedRowRender = () => {
    //   if (props.expandedRowRender && typeof props.expandedRowRender === 'function') {
    //     return props.expandedRowRender();
    //   }

    //   return null;
    // };

    const renderBodyCellContent = (item) => {
      const { record, text, column, index } = item;
      const { dataIndex, isHtml, customRender } = column;
      // console.log('record = ', record);
      if (index === 0 && props.showFilter) {
        return <div class="editable-cell-text-wrapper">this is filter</div>;
      }

      if (customRender && typeof customRender === 'function') {
        return customRender({ text, record, index, column });
      }

      if (isHtml) {
        return (
          <div class="editable-cell-text-wrapper">
            <pre v-html={text} />
          </div>
        );
      }

      if (editableData[`${record.key}-${dataIndex}`]) {
        return (
          <div class="editable-cell-text-wrapper">
            <Input
              style={{ textAlign: 'center' }}
              v-model:value={editableData[`${record.key}-${dataIndex}`][dataIndex]}
              onPressEnter={() => save(record.key, dataIndex, index)}
              // onBlur={() => save(record.key, dataIndex)}
              ref={inputRef}
            />
          </div>
        );
      }

      return (
        <div class="editable-cell-text-wrapper" onClick={() => edit(record.key, dataIndex)}>
          {text || ' '}
        </div>
      );
    };

    const renderBodyCell = (item) => {
      // console.log('column, text, record', column, text, record);
      return <div class="editable-cell">{renderBodyCellContent(item)}</div>;
    };

    const renderSummary = ({ pageData }) => {
      const columns = [...props.columns];
      const columnsSummary = columns.reduce((total, item) => {
        if (item.summary) {
          const key = item.dataIndex;
          const count = pageData.reduce((t, i) => {
            const value = i[key];
            if (typeof value === 'number') {
              return t + value;
            }
            const valueNum = Number(value);
            if (valueNum && valueNum !== NaN) {
              return t + valueNum;
            }
            return t;
          }, 0);
          const countStr = item.summaryAppend ? `${item.summaryAppend} ${count}` : count;
          return [...total, countStr];
        }
        return [...total, null];
      }, []);

      // console.log('props.showSelection = ', props.showSelection);
      return (
        <Table.Summary fixed={true} class="summary">
          <Table.Summary.Row>
            {props.showSelection && (
              <Table.Summary.Cell class="summary" index={0} align="center">
                总计
              </Table.Summary.Cell>
            )}
            {columnsSummary.map((item, index) => {
              if (!props.showSelection && index === 0) {
                return (
                  <Table.Summary.Cell class="summary" index={index} align="center">
                    总计
                  </Table.Summary.Cell>
                );
              }

              return (
                <Table.Summary.Cell index={index} align="center">
                  {item}
                </Table.Summary.Cell>
              );
            })}
          </Table.Summary.Row>
        </Table.Summary>
      );
    };

    const shouldShowSummary = () => {
      const columns = [...props.columns];
      return columns.reduce((total, item) => {
        if (item.summary) {
          return true;
        }
        return total;
      }, false);
    };

    const getSlots = () => {
      let mySlots = {
        ...slots,
      };

      if (props.renderTitle && typeof props.renderTitle === 'function') {
        mySlots = {
          ...mySlots,
          title: props.renderTitle,
        };
      } else if (props.showSelection) {
        mySlots = {
          ...mySlots,
          title: renderTitle,
        };
      }

      // if (props.renderFooter && typeof props.renderFooter === 'function') {
      //   mySlots = {
      //     ...mySlots,
      //     footer: renderFooter,
      //   };
      // }

      // if (props.expandedRowRender && typeof props.expandedRowRender === 'function') {
      //   mySlots = {
      //     ...mySlots,
      //     expandedRowRender: expandedRowRender,
      //   };
      // }

      if (props.renderSummary && typeof props.renderSummary === 'function') {
        mySlots = {
          ...mySlots,
          summary: props.renderSummary,
        };
      } else if (shouldShowSummary()) {
        mySlots = {
          ...mySlots,
          summary: renderSummary as any,
        };
      }

      return {
        ...mySlots,
        bodyCell: renderBodyCell,
      };
    };

    const getRowSelection = () => {
      console.log('getRowSelection headerInfoTags.value = ', headerInfoTags.value);
      if (props.showSelection) {
        return {
          rowSelection: {
            selectedRowKeys: headerInfoTags.value.map((item) => item.key),
            onChange: (selectedRowKeys, selectedRows) => {
              headerInfoTags.value = [...selectedRows];
            },
            getCheckboxProps: (record) => {
              return {
                disabled: !record.key,
                name: record.name,
                key: record.key,
                id: record.id,
              };
            },
          },
        };
      }

      return {};
    };

    // 自动添加一条记录
    const getDataSource = () => {
      if (props.showFilter) {
        return [{}, ...toRaw(props.dataSource)];
      }

      return props.dataSource;
    };

    return () => (
      <Table
        {...props}
        {...getRowSelection()}
        class="customer-table"
        dataSource={getDataSource()}
        columns={props.columns}
        v-slots={getSlots()}
      />
    );
  },
});

export default ProTable;
