# Todo-List-React

## 样式展示

![image-20220525212900361](http://i0.hdslb.com/bfs/album/42edea1d033039d6d33e06938e0925b9f9ba89fa.png)

使用 `React/ReactDom` 制作的 `todo-list` 待办事项。
项目使用 `vite` 创建
样式使用 `tailwind.css` 创建

## 脚本

进入项目路径后,首先安装项目依赖

```sh
pnpm i
```

- 开发测试

开发模式下运行应用，打开浏览器访问 [http://localhost:3000](http://localhost:3000/)

```sh
pnpm dev
```

- 打包构建

将使用 `vite` 打包项目，打包路径在 `dist` 文件夹

```sh
pnpm build
```

- docker 部署
  默认暴露端口在 `4000` 如需服务器部署请修改 `docker-compose.yml` 文件中的 `4000` 端口为自己指定所需

```sh
docker-compose up -d
```
