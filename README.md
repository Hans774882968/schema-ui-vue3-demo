[TOC]

# schema-ui-vue3-demo

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## 什么是声明式UI
[参考链接1](https://flutter.cn/docs/get-started/flutter-for/declarative)：

> 从 Win32 到 Web 再到 Android 和 iOS，框架通常使用一种命令式的编程风格来完成 UI 编程。这可能是你最熟悉的风格——手动构建一个全功能的 UI 实例，比如一个 UIView 或其他类似的内容，在随后 UI 发生变化时，使用方法或 Setter 修改它。

> 为了减轻开发人员的负担，无需编写如何在不同的 UI 状态之间进行切换的代码， Flutter 相反，让开发人员描述当前的 UI 状态，并将转换交给框架。

> 然而，这需要稍微改变下如何操作 UI 的思考方式。

在前端发展史中也有类似情况，在React和Vue都未出现时，我们大概率会使用JQuery来操作DOM，UI的改变通常需要通过命令式编程来实现。但React和Vue声名式的程度真的足够了嘛？我们考虑以下场景：
1. 在一个需求中，对于两种不同角色的用户，需要展示的**UI骨架**大同小异（比如：只有具体的字段不同），但逻辑有所不同。
2. 对于两个开发时间线大致相同的不同需求，需要展示的UI骨架大同小异，但逻辑有所不同。希望**跨需求**完成UI复用。
3. 项目希望从Vue迁移到React，UI从**用户视角**来看不能发生变化，但想必描述UI的代码会有很多差异。

对于前2个问题，你会怎么实现呢？
1. 放弃复用，直接复制粘贴UI代码到两个不同文件，逻辑单独修改。
2. 坚持复用，让UI充满if else。

本文juejin：https://juejin.cn/post/7255855848835727397

本文CSDN：https://blog.csdn.net/hans774882968/article/details/131743408

本文52pojie：https://www.52pojie.cn/thread-1808943-1-1.html

**作者：[hans774882968](https://blog.csdn.net/hans774882968)以及[hans774882968](https://juejin.cn/user/1464964842528888)以及[hans774882968](https://www.52pojie.cn/home.php?mod=space&uid=1906177)**

是否存在一种方案处于两者之间？答案是肯定的。我们首先**约定**使用一个JS对象来描述UI结构，这个JS对象称为UI schema。

比如对于下图：

```js
// (?) 表示tooltip， (number) 表示描述文本中大号加粗的数字
------------------------------------
|title (?)                  link > |
|description (number)              |
------------------------------------
```

1. 上图所有出现的元素，都支持根据不同的视角来配置展示与否。
2. container支持自定义样式，从而能够方便地成为另一个组件的子组件。

我们可以考虑用下面的schema：

```js
interface Title {
  text: string | number
  tips?: string
}

interface Link {
  text: string | number
  action?: () => unknown
}

interface Description {
  text: string | number
  number?: {
    value: string | number,
    strong?: boolean
  }
}

export interface InfoCardSchema {
  title?: Title
  link?: Link
  description?: Description
  style?: Record<string, string> // 表示外层盒子的自定义样式
}
```

还有更复杂的场景，比如大厂B端的列表页，基本上早就完成了schema化的封装。

然后让每种场景各返回一个schema，供组件解析。在此每种场景都可以视为一个hook。

上文我给“约定”加粗，是为了强调UI schema本质上是一个为了完成业务需求而创造的**应用层协议**。因此schema的优缺点就是“协议”的优缺点：

优点：
1. 在实现代码复用的同时，保持了应对业务需求变化的能力。
2. schema是具有业务含义的。在理解解析schema的UI的实现源（shi）码（shan）后，后续接手的同学看到schema就可以快速了解UI蕴含的业务逻辑，信息密度提高了。
3. 上述问题3是技术栈迁移的需要。对于一个代码量巨大的历史组件，我们分两步走：先改造成schema，再改造为另一个技术栈的组件。这就比直接改造为另一个技术栈的组件的风险更小，在降本增效的今天，控制风险可能成为你技术方案的一个亮点……

缺点：
1. 学习曲线更陡峭，需求初次实现成本更高。
2. 对于上述问题2，为了实现跨需求复用，前端同学们需要反复对齐协议，沟通成本大大升高了。

## 这个demo实现了什么
[My GitHub](https://github.com/Hans774882968/schema-ui-vue3-demo)

需求描述：假设有3种类型的看板，随意起名为`admin station agency`。它们的UI骨架有：

1、若干张下面的卡片：

```js
// (?) 表示tooltip， (number) 表示描述文本中大号加粗的数字
------------------------------------
|title (?)                  link > |
|description (number)              |
------------------------------------
```

2、一个带搜索框和分页器的标准列表页。

上面各个组分的UI骨架类似，但展示逻辑大不相同。

另外，看板类型在组件的生命周期中有两种情况：
1. 不会变。比如只需要通过域名上的信息来区分要渲染的看板类型。
2. 会变化。比如看板类型是路由的一个参数。

情况1很简单，所以这个demo展示了情况2的处理，见下文《路由参数变化时重新获取schema》一节。

### 本demo的公共设施
因为只是一个展示UI schema思想的简单demo，所以API请求只是简单模拟了一下。返回值类型定义：

```ts
export type CommonResp<T> = {
  retcode: number,
  message: string,
  data: T
}

export type CommonTableResp<T> = CommonResp<{
  list: T,
  total: number
}>

// 返回值类型定义示例 Promise<CommonTableResp<StationDetailResp>>
```

[模拟API请求的代码传送门](https://github.com/Hans774882968/schema-ui-vue3-demo/blob/main/src/api/multiTypeDashboard.ts)

### 卡片
我们可以设计这样的schema（`src/views/multiTypeDashboard/useMultiTypeDashboardSchema.ts`）：

```ts
interface CardWithProgressSchema {
  style?: Record<string, string>
  infoCardSchema: ComputedRef<InfoCardSchema>
  progressSchema: ComputedRef<ProgressSchema>
}

export interface DashboardSchema {
  overallData: Ref<AdminOverallData | StationOverallData | AgencyOverallData> // 卡片上的信息，从接口里拿
  loadOverallData: () => void // 请求接口的函数
  loadingAssignmentCards?: Ref<boolean> // 控制UI的loading，属于交互优化
  assignmentCards: Array<ComputedRef<InfoCardSchema>> // 第一行的3张卡片
  cardWithProgressSchema1: CardWithProgressSchema // 第二行的3张卡片，上面的子卡片可以认为和第一行的卡片结构相同，下面是一个支持多条数据的进度条
  cardWithProgressSchema2: CardWithProgressSchema
  cardWithProgressSchema3: CardWithProgressSchema
}
```

子组件`info-card`的schema定义：`src/views/multiTypeDashboard/components/infoCardSchema.ts`：

```ts
interface Title {
  text: string | number
  tips?: string
}

interface Link {
  text: string | number
  action?: () => unknown
}

interface Description {
  text: string | number
  number?: {
    value: string | number,
    strong?: boolean
  }
}

export interface InfoCardSchema {
  title?: Title
  link?: Link
  description?: Description
  style?: Record<string, string>
}
```

子组件`card-with-progress`的schema定义：`src/views/multiTypeDashboard/components/cardWithProgressSchema.ts`：

```ts
export interface Percent {
  percent: number
  text: string | number
}

export interface ProgressSchema {
  title: {
    text?: string | number
    tips?: string | number
    data?: string | number
  }
  progress?: Percent[]
}
```

然后，我们主要需要完成：

1. 完成解析schema的UI组件，即让UI代码消费schema。代码：`src/views/multiTypeDashboard/MultiTypeDashboard.vue`。
2. 对于每种类型的看板，都写一个hook函数，其返回值的类型就是上面约定的schema。hook函数的复用程度可以自由控制，甚至可以由不同的前端同学完成，只要符合协议即可。为了方便，我没有进行拆分，直接都在`src/views/multiTypeDashboard/useMultiTypeDashboardSchema.ts`实现了。

解析schema的代码示例：

```vue
    <div v-loading="loadingAssignmentCards" class="progress-cards-wrapper">
      <div class="merged-card-wrapper">
        <card-with-progress
          :style="cardWithProgressSchema1.style"
          :info-card-schema="cardWithProgressSchema1.infoCardSchema"
          :progress-schema="cardWithProgressSchema1.progressSchema"
        />
        <card-with-progress
          :style="cardWithProgressSchema2.style"
          :info-card-schema="cardWithProgressSchema2.infoCardSchema"
          :progress-schema="cardWithProgressSchema2.progressSchema"
        />
      </div>
      <card-with-progress
        class="card-wrapper"
        :style="cardWithProgressSchema3.style"
        :info-card-schema="cardWithProgressSchema3.infoCardSchema"
        :progress-schema="cardWithProgressSchema3.progressSchema"
      />
    </div>

<script lang="ts" setup>
// getMultiTypeDashboardSchema() 通过 route.params.dashboardType 获取对应的schema
const getMultiTypeDashboardSchema = () => {
  const schemaMap: Record<PageTypes, () => DashboardSchema> = {
    admin: getAdminDashboardSchema,
    agency: getAgencyDashboardSchema,
    station: getStationDashboardSchema,
  };

  const { dashboardType } = route.params;
  if (typeof dashboardType !== 'string' || !(dashboardType in schemaMap)) return schemaMap.admin();
  return schemaMap[dashboardType as PageTypes]();
};
    
let {
  loadingAssignmentCards,
  cardWithProgressSchema1,
  cardWithProgressSchema2,
  cardWithProgressSchema3,
} = getMultiTypeDashboardSchema();
</script>
```

hook示例：

```ts
export interface DashboardSchema {
  overallData: Ref<AdminOverallData | StationOverallData | AgencyOverallData>
  loadOverallData: () => void
  loadingAssignmentCards?: Ref<boolean>
  assignmentCards: Array<ComputedRef<InfoCardSchema>>
  cardWithProgressSchema1: CardWithProgressSchema
  cardWithProgressSchema2: CardWithProgressSchema
  cardWithProgressSchema3: CardWithProgressSchema
  detailTableProps: Vue3ProTable
  onClickView?: (row: any) => unknown
}

export const getAdminDashboardSchema = (): DashboardSchema => {
  return {
    assignmentCards: [
      card1,
      card2,
      card3,
    ],
    cardWithProgressSchema1: {
      infoCardSchema: card4,
      progressSchema: progressSchema1,
      style: {
        borderRight: '1px solid #E2E6EC',
        flex: '1',
        padding: '0 16px',
      },
    },
    cardWithProgressSchema2: {
      infoCardSchema: card5,
      progressSchema: progressSchema2,
      style: {
        flex: '1',
        padding: '0 16px',
      },
    },
    cardWithProgressSchema3: {
      infoCardSchema: card6,
      progressSchema: progressSchema3,
    },
    detailTableProps,
    loadOverallData,
    loadingAssignmentCards,
    overallData,
  };
};
```

从代码量来看，解析schema的UI编写难度是比正常写法要高不少的，并且schema协议肯定是需要在开发过程中反复调整的。

### 路由参数变化时重新获取schema
schema要根据这个页面：`/dashboard/:dashboardType`的路由参数`dashboardType`来获取，所以我们会需要这样的伪代码来重新获取正确的schema：

```ts
import { useRoute } from 'vue-router';
const route = useRoute();
// getMultiTypeDashboardSchema() 通过 route.params.dashboardType 获取对应的schema
const getMultiTypeDashboardSchema = () => {
  const schemaMap: Record<PageTypes, () => DashboardSchema> = {
    admin: getAdminDashboardSchema,
    station: getStationDashboardSchema,
    agency: getAgencyDashboardSchema,
  };

  const { dashboardType } = route.params;
  if (typeof dashboardType !== 'string' || !(dashboardType in schemaMap)) return schemaMap.admin();
  return schemaMap[dashboardType as PageTypes]();
};

let {
  loadOverallData,
  loadingAssignmentCards,
  assignmentCards,
  cardWithProgressSchema1,
  cardWithProgressSchema2,
  cardWithProgressSchema3,
  detailTableProps,
  onClickView,
} = getMultiTypeDashboardSchema();

watch(
  () => route.params,
  async () => {
    // 重新获取schema
    ({
      loadOverallData,
      loadingAssignmentCards,
      assignmentCards,
      cardWithProgressSchema1,
      cardWithProgressSchema2,
      cardWithProgressSchema3,
      detailTableProps,
      onClickView,
    } = getMultiTypeDashboardSchema());
    await loadOverallData(); // 重新加载数据
    // 加载数据后的操作
  },
  {
    immediate: true,
  },
);
```

值得注意的是，`DashboardSchema`只要实现妥当，并不需要设计成响应式变量，其成员变量则可以为响应式变量、函数或其他任何事物。

### 列表页
实现一个带搜索框和分页器的列表页是随处可见的需求，因此我们非常需要一个pro-table组件。我们找到了[这个项目](https://github.com/huzhushan/vue3-pro-table/tree/master)，huzhushan大佬实现了一个简单的Vue插件，但很可惜它并不能直接在vue3.2 + TS的工程中跑起来，因此我把代码复制到了自己的工程里。复制后发现这个组件有些小问题，所以我帮忙修复了一下，并输出了[npm包](https://github.com/Hans774882968/vue3-el-pro-table)。详见下文《沉淀自己的pro-table组件，并发布到npm》。

为了让这个组件可以直接接收schema，只需要使用`v-bind`。

```vue
<vue3-pro-table ref="detailTable" v-bind="detailTableProps">
  <template v-if="typeof onClickView === 'function'" #operate="scope">
    <el-button type="text" @click="onClickView(scope.row)">View</el-button>
  </template>
</vue3-pro-table>
```

返回的schema示例：

```ts
export interface DashboardSchema {
  // ...
  detailTableProps: Vue3ProTable // import { Vue3ProTable } from '@/components/Vue3ProTable/interface';
  onClickView?: (row: any) => unknown
}
// agency dashboard
const detailTableProps = {
  columns: [
    { label: 'agency字段3', prop: 'field3' },
    { label: 'agency字段4', prop: 'field4' },
    { label: 'agency字段5', prop: 'field5' },
    { label: 'agency字段6', prop: 'field6' },
    {
      fixed: 'right',
      label: '操作',
      tdSlot: 'operate',
      width: 180, // 自定义单元格内容的插槽名称
    },
  ],
  pagination: {
    pageSizes: [10, 24, 40, 50, 100],
  },
  request: async (params: AgencyDetailParams) => {
    console.log('agency params', params); // dbg
    let res = { list: [] as AgencyDetailResp, total: 0 };
    const action = async () => {
      const { data } = await loadAgencyDetailData(params);
      res = { list: data.list, total: data.total };
    };
    await retryable(action, {
      customErrorHandler: (e: unknown) => { ElMessage.error('agency detail加载失败'); console.error('loadAgencyDetailData error', e); },
    });
    return {
      data: res.list,
      total: res.total,
    };
  },
  search: {
    fields: [
      {
        label: 'agency字段3',
        name: 'field3',
        type: 'text',
      },
      {
        label: 'agency字段4',
        name: 'field4',
        type: 'text',
      },
      {
        label: 'agency字段5',
        name: 'field5',
        type: 'text',
      },
      {
        label: 'agency字段6',
        name: 'field6',
        type: 'text',
      },
    ],
  },
};

interface AgencyTableItem {
  field3: string
  field4: string
  field5: string
  field6: string
}
const onClickView = (row: AgencyTableItem) => {
  ElMessage(`模拟查看${row.field3}详情`);
};
```

易踩坑点：如果你需要在修改作为子组件`props`的参数后，立即调用内部使用到`props`的方法。比如：在切换route时`detailTableProps`会变化，并且此时需要立即调用`handleReset`刷新列表。那么需要等到下一次渲染，`props`才会变为最新，即你需要使用`nextTick`。

```ts
type loadTypes = 'init' | 'routeChange' | 'autoRefresh';

const loadWholePage = ({ loadType }: { loadType: loadTypes }) => {
  loadOverallData();
  if (loadType === 'init') {
    nextTick(() => {
      detailTable.value && (detailTable.value as any).refresh();
    });
    return;
  }
  if (loadType === 'routeChange') {
    nextTick(() => {
      detailTable.value && (detailTable.value as any).handleReset();
    });
  }
};
```

## 沉淀自己的pro-table组件，并发布到npm
[传送门](https://github.com/Hans774882968/vue3-el-pro-table)

约定：npm包名`vue3-el-pro-table`，引用`vue3-el-pro-table`的包名为“本项目”。

声明：`Vue3ProTable.vue`代码是在[这个项目](https://github.com/huzhushan/vue3-pro-table/tree/master)的基础上进行修改的。

**作者：[hans774882968](https://blog.csdn.net/hans774882968)以及[hans774882968](https://juejin.cn/user/1464964842528888)以及[hans774882968](https://www.52pojie.cn/home.php?mod=space&uid=1906177)**

### Quick Start
```bash
yarn add vue3-el-pro-table
```

`src/main.ts`

```ts
import 'vue3-el-pro-table/dist/vue3-el-pro-table.css';
import Vue3ProTable from 'vue3-el-pro-table';

createApp(App)
  .use(Vue3ProTable)
  .mount('#app');
```

Then use `<vue3-pro-table />` directly in `.vue` file.

Interface:

```ts
import { Vue3ProTableProps } from 'vue3-el-pro-table';
```

### 开发过程笔记
根据[参考链接3](https://5balloons.info/create-publish-you-first-vue-plugin-on-npm-the-right-way/)，实际上我们只需要提供一个符合Vue插件格式的入口`install.js`，和一个Vue组件。但为了满足npm包迭代过程中的预览、测试等需求，我们仍然需要以组件库的标准来开发这个npm包。因此我采用的方案是：先使用`vue-cli`快速创建一个项目，满足组件的预览、测试等需求，在此基础上再新增一个构建流程。

1. 使用`vue-cli`创建一个普通的Vue3 + TS项目。
2. 新增组件`src/components/Vue3ProTable.vue`。
3. 新增Vue插件入口`src/install.js`：

```js
import HelloWorld from './components/HelloWorld.vue';
import Vue3ProTable from './components/Vue3ProTable.vue';

function install(app) {
  if (install.installed) return;
  install.installed = true;

  app.component('test-hello-world', HelloWorld); // 顺便把脚手架生成的组件也注册为全局组件
  app.component('vue3-pro-table', Vue3ProTable);
}

Vue3ProTable.install = install;

export default { install };
```

4. 新增`build-lib`命令并运行`yarn build-lib`：

```json
{
  "scripts": {
    "build": "vue-cli-service build", // 作为对比
    "build-lib": "vue-cli-service build --target lib --name vue3-el-pro-table ./src/install.js" // 参考：https://cli.vuejs.org/guide/build-targets.html#library
  },
}
```

5. 构建成功后修改`package.json`修改下入口：

```json
{
  "main": "dist/vue3-el-pro-table.umd.js",
}
```

在另一个项目（即本项目）预览最新改动：

```bash
yarn add file:../vue3-el-pro-table
```

接下来开始踩坑了。当引入的组件使用slot的时候会报错：

```
Cannot read properties of null (reading 'isCE')
```

根据[参考链接2](https://stackoverflow.com/questions/71063992/when-importing-self-made-vue-3-library-into-vue-3-project-uncaught-typeerror)，原因是本项目和`vue3-el-pro-table`各有一个vue，即使它们版本相同也会引起冲突。虽然参考链接2的提问说给webpack添加vue配置无济于事，但我的项目用这个配置是可以解决问题的。

在本项目的`vue.config.js`禁用symlinks并alias vue：

```js
const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = defineConfig({
  chainWebpack(config) {
    config.resolve.symlinks(false);
    config.resolve.alias.set('vue', path.resolve('./node_modules/vue'));
  },
  devServer: {
    port: 8090,
  },
  transpileDependencies: true,
});
```

### add TS Support
为了防止本项目报TS错误，我们的npm包`vue3-el-pro-table`需要给出`.d.ts`文件。

1. 本项目`package.json`指定类型定义文件路径：

```json
{
  "types": "dist/global.d.ts"
}
```

2. 本项目`tsconfig.json`新增配置：

```json
{
  "compilerOptions": {
    "types": [
      "webpack-env",
      "jest",
      "vue3-el-pro-table/dist/global.d.ts", // 获取 vue3-el-pro-table 注册的全局组件的类型提示
      "element-plus/global.d.ts" // 获取 element-plus 组件的类型提示
    ],
  }
}
```

`global.d.ts`不应该放在`dist`目录，因此我把它放到了`src/global.d.ts`，并配置`CopyWebpackPlugin`。`vue3-el-pro-table`的`vue.config.js`：

```js
const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = defineConfig({
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'src', 'global.d.ts'),
            to: path.resolve(__dirname, 'dist'),
          },
        ],
      }),
    ],
  },
  transpileDependencies: true,
});
```

最理想的情况下`dist/global.d.ts`能在编译时直接生成，但可惜我们参考的`Vue3ProTable.vue`不是一个TS组件，且改造为TS组件的工作量过大，因此`global.d.ts`是手动维护的，[传送门](https://github.com/Hans774882968/vue3-el-pro-table/blob/main/src/global.d.ts)。

我们期望`dist/global.d.ts`能够给组件提供类型提示。根据[参考链接4](https://juejin.cn/post/7066730414626308103)，需要以下代码：

```ts
declare const CVue3ProTable: import('vue').DefineComponent<......>;
declare const CHelloWorld: import('vue').DefineComponent<{
  msg: StringConstructor;
}, unknown, unknown, object, object, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, object, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  msg: StringConstructor;
}>>, object, object>;

declare module 'vue' {
  export interface GlobalComponents {
    Vue3ProTable: typeof CVue3ProTable
    TestHelloWorld: typeof CHelloWorld
  }
}
```

这里的`CVue3ProTable, CHelloWorld`看上去很复杂，不会是手写的吧？的确不是手写的，可以让`vue-tsc`生成。首先安装`vue-tsc`并新增命令：

```json
{
  "gen-declaration": "vue-tsc -p tsconfig.declaration.json"
}
```

然后新增`tsconfig.declaration.json`：

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "es",
    "declaration": true,
    "emitDeclarationOnly": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "**/__tests__/**", "**/__demos__/**", "**/*.md"]
}
```

最后执行`yarn gen-declaration`，把组件的类型定义复制到`global.d.ts`即可。

## requestRetry：重试请求能力
虽然跟主题没关系但毕竟也是我在做B端需求的过程中沉淀出来的，因此还是简单记录一下。思路很简单：
1. 递归。
2. 类似后端Controller层和Service层的关系，写一个wrapper函数整理一下参数。

`src/views/multiTypeDashboard/requestRetry.ts`：

```ts
type RetryOption = {
  errorMsg?: string,
  customErrorHandler?: (e: unknown) => unknown
  delay?: boolean,
  beforeRequest?: () => unknown,
  afterRequest?: () => unknown
};

async function innerRetryable(tryCount: number, action: () => unknown, options: Required<RetryOption>) {
  const {
    errorMsg, customErrorHandler, beforeRequest, afterRequest,
  } = options;
  if (tryCount >= 3) {
    return;
  }
  try {
    if (!tryCount) {
      await beforeRequest();
    }
    await action();
  } catch (error) {
    if (!customErrorHandler) {
      console.error(errorMsg, error);
    } else {
      await customErrorHandler(error);
    }
    await innerRetryable(tryCount + 1, action, options);
  } finally {
    if (!tryCount) {
      afterRequest();
    }
  }
}

export default async function retryable(action: () => unknown, options: RetryOption = {
  errorMsg: '', delay: false, beforeRequest: () => {}, afterRequest: () => {},
}) {
  const {
    errorMsg, customErrorHandler, delay, beforeRequest, afterRequest,
  } = options;
  const parsedOptions = {
    errorMsg: errorMsg || '',
    customErrorHandler: customErrorHandler || (() => {}),
    delay: delay || false,
    beforeRequest: beforeRequest || (() => {}),
    afterRequest: afterRequest || (() => {}),
  };
  if (delay) return () => innerRetryable(0, action, parsedOptions);
  return innerRetryable(0, action, parsedOptions);
}
```

[单测传送门：`tests/unit/requestRetry.spec.ts`](https://github.com/Hans774882968/schema-ui-vue3-demo/blob/main/tests/unit/requestRetry.spec.ts)。测试用例保证了请求前后代码的执行顺序符合预期。

## 参考资料
1. 声明式 UI 介绍：https://flutter.cn/docs/get-started/flutter-for/declarative
2. Cannot read properties of null (reading 'isCE')：https://stackoverflow.com/questions/71063992/when-importing-self-made-vue-3-library-into-vue-3-project-uncaught-typeerror
3. 在 NPM 上创建并发布您的第一个 Vue.JS 插件：https://5balloons.info/create-publish-you-first-vue-plugin-on-npm-the-right-way/
4. 全局组件类型声明的最佳实践 (Vue3+TS+Volar)：https://juejin.cn/post/7066730414626308103