---
title: How to Create Menu Entry for Linux Applications Installed From tar.gz
author: Trang Le
pubDatetime: 2023-06-18T10:27:52Z
postSlug: add-linux-application-to-menu
featured: false
draft: false
tags:
  - linux
description: "Not all of your installed applications are going to show in the Linux menu. This post will show you how to add A launchable icon of that application to the menu of Linux and make it pinnable to the panel."
---

I've always thought that if you install a new application in Linux, its icon will appear in the Menu and you can pin it to the panel.

I realized I was wrong when I tried out Siyuan. Whether I installed the app through an AppImage file or a tar.gz, the application was nowhere to be found in the All Applications section of the menu. When I opened it, its icon only appears in the bottom right corner of the screen. The fact that the application icon didn't appear in the panel also means that I couldn't pin it either.

Thanks to the good folks on the internet, I learned that I needed to create a `.desktop` file. They are text files that inform the system of the existence of an application.

AppImage is just one file just contains all the data required to run an application. It doesn't come with a `.desktop` file. You can create a `.desktop` file for your AppImage application by installing AppImageLauncher and it will do all the legworl for you.

Alternatively, you can manually create a text file and save it with the `.desktop` extension. Some important information that should be present in the this file:

- Name: This will be the name appearing in the list of Show Applications in the menu.
- Exec: Path to the executable of the application
- Icon: Path to the icon image for the application. This is not required, but it will help you notice the application quickly among a sea of apps.

Then where should you put this file? I think this varies among Linux distributions, but most of my applications that are launchable from the menu have the desktop files placed at `/usr/share/applications`, so I went with it.

Here is my desktop file for Siyuan:

```
[Desktop Entry]
Version=1.0
Name=Siyuan
Comment=Build your eternal digital garden
Exec=/opt/siyuan-2.9.1-linux/siyuan
Icon=/opt/siyuan-2.9.1-linux/resources/appearance/boot/icon.png
Terminal=false
Type=Application
Categories=Utility;Application;
```

[siyuan in menu](./siyuan-launcher-in-menu.png)

You can see that my menu has a lot of siyuan related icons due to my various attemps to create a desktop file.
