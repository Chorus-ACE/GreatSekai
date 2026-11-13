# 数据与资源来源清单

核对日期：2026-11-12。范围为 GreatSekai、SekaiKit（含模型导入器）、Astray，以及 JSON2Proto、Sekai-Lyrics、Sekai-3D-Assets 的当前数据管线。排除第三方代码、SDK、测试素材、历史备份目录和许可证链接。以下描述代码中的请求路径，不是授权或许可证结论。

## 除 Sekai Viewer、MoeSekai 之外的来源

| 来源 | 取得的内容 | 何时请求 |
| --- | --- | --- |
| **Sekai-World** | 五个地区的游戏主数据；包括角色、卡片、活动、歌曲、服装、剧情目录、公告目录等 | 数据更新任务生成 Protobuf/模型目录；客户端也直接读取尚未归档的少量 JSON 表 |
| **Haruki** | Live2D 模型、贴图、物理、动作与表情；剧情播放器的背景、语音、BGM、音效、特效、字体、UI、影片等；3D 服装缩略图；部分剧情解析所需主数据 | 打开相应查看器或加载对应资源时 |
| **UniPJSK 资源服务** | 卡片透明人物立绘（正常、特训后） | 卡片详情加载对应图片时；没有立绘的卡片可能请求失败 |
| **游戏官方资源服务器 / 地区 CDN** | 3D 查看器使用的原始 Unity 资源包；资产目录和版本信息 | 客户端按需下载并在设备上转换资源包；更新任务取得资源索引及生成下载清单 |
| **游戏官方公告网页** | 公告正文及网页引用的图片等资源 | 打开公告详情时；先加载网页，再转换为应用内阅读内容 |
| **Sekaipedia（可选测试功能）** | 根据游戏 ID 查询 Wiki 页面 ID，以生成外部链接 | `SekaipediaDynamicFetch` 开关开启后，点击或复制卡片、活动、歌曲的 Sekaipedia 链接时；默认关闭 |

### Sekai-World

主数据仓库为 [日本](https://github.com/Sekai-World/sekai-master-db-diff)、[Global](https://github.com/Sekai-World/sekai-master-db-en-diff)、[台湾](https://github.com/Sekai-World/sekai-master-db-tc-diff)、[中国大陆](https://github.com/Sekai-World/sekai-master-db-cn-diff)、[韩国](https://github.com/Sekai-World/sekai-master-db-kr-diff)。这是 Sekai Viewer 所用的主数据上游；这里单列，避免把 GitHub 镜像误认为应用自行生产的数据。

JSON2Proto 的更新任务通过 GitHub API 固定主数据提交，再从 `raw.githubusercontent.com` 读取对应 JSON。客户端的直接读取包括 `cardCostume3ds.json`、`honorGroups.json`、`unitStories.json`、`eventStories.json`、`userInformations.json`；Live2D 目录另外读取日服 `character2ds.json`。歌词更新任务也用地区 `musics.json` 取得歌曲 ID，歌词正文仍来自 MoeSekai。

代码入口：[JSON2Proto 更新任务](/Users/t785/Xcode/Sekai/JSON2Proto/Scripts/update_assets.py)、[剧情目录](/Users/t785/Xcode/Sekai/SekaiKit/SekaiKit/Content/Episode.swift)、[公告目录](/Users/t785/Xcode/Sekai/SekaiKit/SekaiKit/Content/NewsItem.swift)、[Live2D 目录](/Users/t785/Xcode/Sekai/GreatSekai/GreatSekai/Tools/Live2DViewer/Live2DCatalog.swift)。

### Haruki

资源根地址有两个回退入口：

- `https://sekai-assets-haruki.seiunx.net/jp-assets/`
- `https://sekai-assets-cn03-she01-cdn.haruki.seiunx.com/jp-assets/`

Live2D 模型目录来自 `story-player/index.json`，模型及其依赖文件从这些根地址取得。剧情播放器使用日服模型和演出资源；地区化剧情文本则由 Sekai Viewer 的地区剧情 JSON 提供。Live2D 背景和补充动作目录也会使用 Sekai Viewer 的存储服务，不能把整个查看器归为单一来源。

剧情解析还可能读取 `eventStories`、`character2ds`：先请求 `https://sekai-api-cdn.haruki.seiunx.com/v1/master/jp/files/`，再回退至 [Team-Haruki/haruki-sekai-master](https://github.com/Team-Haruki/haruki-sekai-master) 的 `master/` JSON。

代码入口：[资源解析器](/Users/t785/Xcode/Sekai/GreatSekai/Packages/Astray/Astray/Assets/HarukiAssetResolver.swift)、[剧情资源选择](/Users/t785/Xcode/Sekai/GreatSekai/GreatSekai/Tools/StoryViewer/StoryPlaybackAssets.swift)、[服装缩略图](/Users/t785/Xcode/Sekai/SekaiKit/SekaiKit/Content/3DModels.swift)。

### UniPJSK

`https://assets.unipjsk.com/startapp/character/member_cutout_trm/<bundle>/normal.png` 和 `after_training.png` 提供卡片透明人物图。普通卡图和缩略图仍来自 Sekai Viewer。

代码入口：[卡片图片地址](/Users/t785/Xcode/Sekai/SekaiKit/SekaiKit/Content/Card.swift:250)、[卡片详情的实际使用](/Users/t785/Xcode/Sekai/GreatSekai/GreatSekai/Info/Card/CardDetailView.swift:79)。

### 官方 3D 资源

3D 查看器当前使用 `Model3DLocalClient`：先从本项目的 GitHub 数据仓库取得地区目录和服装清单，再按清单中的 `assetBaseURL` 请求官方原始资源包，在本地转换为网格和贴图。本项目的 GitHub 仓库不是这些原始资源包的提供方。

| 地区 | 原始资源地址 / 配套接口 |
| --- | --- |
| 日本 | `production-<hash>-assetbundle.sekai.colorfulpalette.org`；签名接口 `issue.sekai.colorfulpalette.org/api/signature`；更新任务还使用 `game-version.sekai.colorfulpalette.org` 和对应 `assetbundle-info` 主机 |
| Global | `n-<profile>-<hash>-assetbundle.sekai-en.com`；更新任务使用 `game-version.sekai-en.com` 和对应 `assetbundle-info` 主机 |
| 台湾 | `lf16-mkovscdn-sg.bytedgame.com/obj/sf-game-alisg/gdl_app_5245/` |
| 韩国 | `lf19-mkkr.bytedgame.com/obj/sf-game-alisg/gdl_app_292248/` |
| 中国大陆 | `lf3-mkcncdn-tos.dailygn.com/obj/sf-game-lf/gdl_app_5236/` |

后三个地区的更新任务还会将路径中的 `sf-game` 替换为 `rt-game` 读取版本号。不同地区、平台、版本和资源哈希分别记录在清单中。

代码入口：[当前查看器客户端](/Users/t785/Xcode/Sekai/SekaiKit/SekaiKit/Networking/Model3DLocalClient.swift)、[资源包下载与转换](/Users/t785/Xcode/Sekai/SekaiKit/Packages/SekaiModelImporter/Sources/SekaiModelImporter/DeviceModelClient.swift)、[允许的地区资源主机](/Users/t785/Xcode/Sekai/SekaiKit/Packages/SekaiModelImporter/Sources/SekaiModelImporter/DeviceModelSourceManifest.swift)、[目录更新任务](/Users/t785/Xcode/Sekai/Sekai-3D-Assets/scripts/device_sources.py)。

### 公告正文

公告列表取自 Sekai-World 的各地区 `userInformations.json`。日服、Global 的相对正文地址分别解析至：

- `https://production-web.sekai.colorfulpalette.org/`
- `https://n-production-web.sekai-en.com/`

如果记录已经提供绝对 HTTP(S) 地址，则按该地址加载，其他地区也遵循这一规则；网页自身还可能引用其他域名的图片和资源，因此不能仅凭代码中的固定域名穷举所有公告请求。

代码入口：[地址解析](/Users/t785/Xcode/Sekai/SekaiKit/SekaiKit/Content/NewsItem.swift)、[网页读取与正文提取](/Users/t785/Xcode/Sekai/GreatSekai/GreatSekai/News/NewsDetailView.swift)。

### Sekaipedia 的实际范围

当前 `w/api.php?action=cargoquery` 只查询目标页面的 `_pageID`。请求在点击/复制外部链接时执行，不会在显示详情页面时自动预取，也不导入 Wiki 正文或歌词。功能开关默认关闭；角色的 Sekaipedia 链接由已有英文角色名直接生成，无需查询接口。

代码入口：[页面 ID 查询](/Users/t785/Xcode/Sekai/GreatSekai/GreatSekai/Methods/Sekaipedia.swift)、[开关与点击行为](</Users/t785/Xcode/Sekai/GreatSekai/GreatSekai/UI Basics/ExternalLinks.swift>)。

## 本项目托管的数据镜像

三个 `Chorus-ACE` 仓库是分发层，需要继续区分其上游：

| 仓库 | 客户端取得的内容 | 上游 |
| --- | --- | --- |
| [Sekai-Protobuf-Assets](https://github.com/Chorus-ACE/Sekai-Protobuf-Assets) | 压缩 Protobuf 主数据 | Sekai-World；另有 Sekai Viewer 的 `music_metas.json` |
| [Sekai-Lyrics](https://github.com/Chorus-ACE/Sekai-Lyrics) | 歌词 JSON | 仅 MoeSekai 的 `translation.exmeaning.com/files/translation/lyrics/`；英语歌词不另设来源 |
| [Sekai-3D-Assets](https://github.com/Chorus-ACE/Sekai-3D-Assets) | 模型目录、服装与资源包依赖清单 | Sekai-World 主数据及官方资源索引；原始资源包由设备向官方 CDN 下载 |

SekaiKit 还保留 `Model3DClient`（`regions/`）和 `Model3DDeviceSourceClient`（`device/`）入口；当前 GreatSekai 查看器使用的是 `device/v2/` 路径。

## 仅跳转的外部链接

Cleista（`pjsk.cleista.cc`）、PJSekai.moe（`pjsekai.moe`，与 MoeSekai 的 `pjsk.moe` 不同）、Sonolus、YouTube、Niconico 目前提供跳转链接，没有作为对应页面内容的数据抓取来源。Haruki、Sekai Viewer、MoeSekai 同时拥有外部跳转和实际数据请求，不能仅按链接出现次数判断来源。

GitHub 项目主页、问题反馈、备案链接、许可证网页，以及代码注释中的参考链接也不算游戏数据来源。

## 可选智能服务与本地资源

- 智能功能可向用户配置的 OpenAI 兼容服务请求生成内容，默认地址为 `api.openai.com/v1`；ChatGPT 连接还使用 `auth.openai.com` 的登录接口。它们属于可选生成服务，不是游戏主数据或歌词提供方。地址可以由用户修改，不能穷举域名。
- macOS 面捕随应用携带 Google MediaPipe 的 `face_landmarker.task` 模型，运行时在本机推理，不上传摄像头帧。模型是数据资源，故在此列出；MediaPipe/Cubism 等 SDK 代码依赖不在本清单范围内。
- 用户输入的 Live2D 背景 HTTP(S) URL 会被按需读取；缓存、应用自带图片和字体不产生固定的第三方数据请求。

代码入口：[兼容服务配置](/Users/t785/Xcode/Sekai/GreatSekai/GreatSekai/Settings/Intelligence/LanguageModelManager.swift)、[面捕模型声明](/Users/t785/Xcode/Sekai/GreatSekai/Packages/SekaiMediaPipe/Sources/SekaiMediaPipeModels/Resources/NOTICE.txt)、[本地面捕](/Users/t785/Xcode/Sekai/GreatSekai/Packages/SekaiMediaPipe/Sources/SekaiMediaPipe/FaceLandmarker.swift)。
