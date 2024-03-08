## PART 1

### 01 - Pay attention to UI re-renders

- Issue: Incorrect state updates cause extraneous rendering cycles
- By default, a component re-render if its parent is re-rendering or the props are different. This means that your component’s render method can sometimes run, even if their props didn’t change. This is an acceptable tradeoff in most scenarios, as comparing the two objects (the previous and current props) would take longer.
- Solution: Profile with Flipper and find out what are the causes for re-render. Optimize the number of state updates and use memoized components when needed. Atomic state.

### 02 - Use dedicated components for certain layouts

- Issue: You are unaware of the higher-order components that are provided with React Native. Like FlatList. Or FlashList for better.

### 03 - Think twice before you pick an external library

- Be more selective and use smaller specialized library
- instead `import moment from 'moment';` 67KB do `import dayjs from 'dayjs';` 2KB
- instead `import { map } from 'lodash';` do `import map from 'lodash/map';`
  It will reduce your final bundle size. Specially if you use tree shaking mechanism. Unfortunately Metro does not support tree shaking. Hermes engine will solve this.

**react-native-bundle-visualizer** is a tool to see your bundle's details.

### 04 - Always remember to use libraries which dedicated to mobile

- Issue: Not optimized libraries cause battery drain and slow down the app. The OS may limit your application’s capabilities.

### 05 - Find the balance between native and JavaScript

### 06 - Animate at 60FPS - No matter what

- Issue: Use native solutions to achieve smooth animations and a gesture-driven interface at 60FPS. JS-driven animations are occupying the bridge traffic and slowing down the application.
- Solution: react-native-gesture-handler with Reanimated. Also wait for New Architecture for startTransition API.

### 07 - Replace Lottie with Rive

- Use rive for better performance while using animations

### 08 - Draw efficiently on a canvas with Skia

ISSUE: CORE APPLICATION DESIGN IDEA IS DIFFICULT TO IMPLEMENT WITH THE TRADITIONAL APPROACHES
Skia is an open source 2D graphics library which provides common APIs that work across a variety of hardware and software platforms. It serves as the graphics engine for Google Chrome and ChromeOS, Android, Flutter, Mozilla Firefox and Firefox OS, and many other products.
Rive also has some constraints like limited Blur, Glow, Shadow support and limited path effects.

### 09 - Optimize your app’s JavaScript bundle

- Issue: Metro, the default JS bundler for React Native, produces a bundle that’s too large.
- Solution: Use different bundlers like Re.Pack, ESBuild etc.
- Benefits: Ship less JavaScript to your users. Save developers’ time when bundling.

## PART 2

### 01 - Always run the latest React Native version to access the new features

- So you'll get better performance, newer features and easier updating work

### 02- How to debug faster and better with Flipper

- In React Native you may need the debug two layers. One is JS part and the other one is Native part. To debug native part you can use XCode or Android Studio.
- Flipper is a desktop app with a convenient interface, which directly integrates with your application’s JS and native code. This means that you no longer have to worry about JS runtime differences and the performance caveats of using the Chrome Debugger.

### 03 - Avoid unused native dependencies

- Issue: You have a lot of dependencies in your project but you don’t know if you need all of them
- Improve the Time to Interactive of your app by removing the linking of unused dependencies.
- Solution: Find and remove unused dependencies. Use sth like `npx depcheck`
- Removing a few unused native dependencies ended up reducing both the size of the app bundle and TTI by around 17%.

### 04 - Optimize your application startup time with Hermes

### 05 - Optimize your Android application’s size with these Gradle settings

- By default, a React Native application on Android consists of:
  • four sets of binaries compiled for different CPU architectures,
  • a directory with resources such as images, fonts, etc.,
  • a JavaScript bundle with business logic and your React components,
  • other files.

- Solution: Flip the boolean flag enableProguardInReleaseBuilds to true, adjust the Proguard rules to your needs, and test release builds for crashes. Also, flip enableSeparateBuildPerCPUArchitecture to true.
- Android is an operating system that runs on plenty of devices with different architectures, so your build must support most of them. React Native supports four: armeabi-v7a, arm64-v8a, x86, and x86_64. Use aab instead of apk to solve that issue.
- Another way of decreasing the build size is by enabling Proguard. Proguard works in a similar way to dead code elimination from JavaScript - it gets rid of the unused code from third-party SDKs and minifies the codebase.
- `def enableProguardInReleaseBuilds = true `
- Another good practice is keeping your eye on resources optimization. Each application contains some svg or png graphics that can be optimized using free web tools.

### 06 - Experiment with the New Architecture of React Native

- Both new and old architecture is based on the communication between JavaScript and the native side. Currently, this communication is handled by the bridge. Let’s go over its limitations in order to easier understand the problems that the New Architecture is trying to solve.
  • It is asynchronous: the JavaScript side submits data to a bridge and waits for the data to be processed by the native side
  • It’s single-threaded (that’s why it’s important to not overload the JS thread and execute animations on the UI thread).
  • It adds additional overhead when it comes to the serialization of data from JSON objects.

- Starting from React Native 0.68, developers can leverage new capabilities of the framework. Mainly the New Architecture consists of two pillars: Fabric and TurboModules. The first one is a new rendering system and the second one is a new way of writing native modules.

- **Fabric** - Fabric is React Native's new concurrent rendering system, a conceptual evolution of the legacy render system. The core principle is to unify more render logic in C++ to better leverage interoperability between platforms. Host Components like View, Text, etc. are now lazily initialized, resulting in faster startups.

Fabric allows us to take advantage of the features introduced in React 18. Instead of the bridge, we can use JSI which is synchronous by default. For the time being, React Native is not removing the bridge completely; it’s still available so developers can gradually adopt the New Architecture and JSI. However, using the bridge needs to be explicitly stated (by importing it), so modules not yet migrated won’t work. Meta is planning to soon allow apps to run in a completely bridgeless mode.

- **TurboModules** - This is a new way of writing native modules that also leverages the power of JSI, allowing for synchronous, and an order of magnitude faster data transfer from native to JS and vice versa. It is a rewrite of the communication layer between JavaScript and platform native modules like Bluetooth, Biometrics, etc. It also allows for writing native code for both platforms using C++ and introduces the lazy loading of modules to speed up your app startup time.

- There are also two more that are essential to understanding how New Architecture works. The first, Codegen drastically improves DX by generating a lot of native boilerplate code. And the second, JSI, is a C++ API that interacts with any JS engine.

- **Codegen** - A code generation tool that makes JS a source of truth by automating the compatibility between the JS and native sides. It allows for writing statically typed JS (called JS Spec) which is then used to generate the interface files needed by Fabric native components and TurboMod- ules. Spec consists of a set of types written in TypeScript or Flow that defines all the APIs provided by the native module. Codegen ensures type-safety as well as compile-time type safety, which means smaller code and faster execution as both realms can trust each other around validating the data every time. To find out more about it, refer to the docs.

- **JSI** - JSI is the foundation of the New Architecture, a C++ API for interacting with any JS engine. In contrast to the bridge which was asynchronous, JSI is synchronous which allows for invoking native functions faster. It lets JavaScript to hold references to C++ host objects and invoke methods directly on them. This removes the major overhead of asynchronous communication between JS and native by serializing objects using the bridge.

## PART 3

### 1 - Run tests for key pieces of your app

- Solution: Don’t aim at 100% coverage, focus on key pieces of the app. Test mostly integration.

### 2 - Have a working Continuous Integration (CI) in place

- Solution: Use a CI provider such as **CircleCI** to build your application. Run all the required tests and make preview releases if possible.

### 3 - Don’t be afraid to ship fast with Continuous Deployment

- Issue: Building and distributing your apps manually is a complex and time-consuming process.
- Continuous Deployment is a strategy in which software is released frequently through a set of automated scripts. It aims at building, testing, and releasing software with greater speed and frequency. The approach helps reduce the cost, time, and risk of delivering changes by allowing for more incremental updates to applications in production.
- Solution: Establish a continuous deployment setup (based on **Fastlane**) that makes the build and generates the changelog. Ship to your users instantly.
- **AppCenter** is a cloud service with tooling for the automation and deployment of your application. Its biggest advantage is that many of the settings can be configured from the graphical interface. It is much easier to set up the App Store and Play Store deployments this way, rather than working with uploads from the command line.

### 4 - Ship OTA (Over-The-Air) when in an emergency

- There are two popular ways to implement OTA into your app. The first and most popular tool for OTA updates is CodePush, a service that is a part of Microsoft’s App Center suite. The second tool is created by the Expo team and it’s called EAS Update.

### 5 - Make your app consistently fast

- Issue: Every once in a while after fixing a performance issue, the app gets slow again.
- Solution: Use the DMAIC methodology to help you solve performance issues consistently. The acronym stands for Define, Measure, Analyze, Improve, and Control.

### 6 - Know how to profile iOS with XCode

### 7 - Know how to profile Android with Android Studio
