[toc]

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

是否存在一种方案处于两者之间？答案是肯定的。我们**约定**使用一个JS对象来描述UI结构，这个JS对象称为schema。

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

上文我给“约定”加粗，是为了强调schema本质上是一个为了完成业务需求而创造的**应用层协议**。因此schema的优缺点就是“协议”的优缺点：

优点：
1. 在实现代码复用的同时，保持了应对业务需求变化的能力。
2. schema是具有业务含义的。在理解解析schema的UI的实现源（shi）码（shan）后，后续接手的同学看到schema就可以快速了解UI蕴含的业务逻辑，信息密度提高了。
3. 上述问题3是技术栈迁移的需要。对于一个代码量巨大的历史组件，我们分两步走：先改造成schema，再改造为另一个技术栈的组件。这就比直接改造为另一个技术栈的组件的风险更小，在降本增效的今天，控制风险可能成为你技术方案的一个亮点……

缺点：
1. 学习曲线更陡峭，初次实现成本更高。
2. 对于上述问题2，为了实现跨需求复用，前端同学们需要反复对齐协议，沟通成本大大升高了。

## 这个demo实现了什么
[My GitHub](https://github.com/Hans774882968/schema-ui-vue3-demo)

需求描述：假设有3种类型的看板，随意起名为`admin station agency`。它们的UI骨架都是下面的卡片：

```js
// (?) 表示tooltip， (number) 表示描述文本中大号加粗的数字
------------------------------------
|title (?)                  link > |
|description (number)              |
------------------------------------
```

但上面各个组分的展示逻辑大不相同。另外，看板类型有两种情况：
1. 不会变。比如只需要通过域名上的信息来区分要渲染的看板类型。
2. 看板类型是路由的一个参数。

情况1很简单，所以这个demo展示了情况2的处理。

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

1. 完成解析schema的UI代码，即`src/views/multiTypeDashboard/MultiTypeDashboard.vue`。
2. 对于每种类型的看板，都写一个hook函数，其返回值的类型就是上面约定的schema。hook函数的复用程度可以自由控制，甚至可以由不同的前端同学完成，只要符合协议即可。为了方便，我直接都在`src/views/multiTypeDashboard/useMultiTypeDashboardSchema.ts`实现了。

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

单测传送门：`tests/unit/requestRetry.spec.ts`。测试用例保证了请求前后代码的执行顺序符合预期。

## 参考资料
1. 声明式 UI 介绍：https://flutter.cn/docs/get-started/flutter-for/declarative