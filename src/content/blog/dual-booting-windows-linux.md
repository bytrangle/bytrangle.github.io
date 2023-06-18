---
title: A Dummy Tried to Dual Boot with Windows and Linux
author: Trang Le
pubDatetime: 2023-06-05T11:04:50Z
postSlug: dual-boot-windows-linux
featured: false
draft: false
tags:
  - Linux
  - Linux Mint
  - Windows
  - dual booting
description: A dummy's account of dual booting with Linux and Windows. Read on if you want to use Linux but still need to use some apps that only run on Windows.
---

Recently, I got myself a new PC. After several hours of tinkering with Windows, I knew that I wouldn't want it to be my main Operating System (OS). So off I went researching how to install Linux.

There are several options for using Linux:

- Using Windows Subsystem for Linux
- Using a virtual machine
- Dual boot with Windows and Linux

I'm not fond of the first two options because they still treat Windows as a primary OS and Linux as just an application. So I'm left with the final option: dual booting. It means I will have two OS on my computer and I can switch between them whenever I like. I'm not into Windows, but nothing is going to convince me that Gimp is superior to Affinity Photos or Inkscape is better than Affinity Designer.

You don't have to go this route. For trying out Linux, using WSL or a virtual box is more than enough. However, if you like Linux but you have to use some apps that only run on Windows (Affinity apps for me), then dual booting is what you need.

Scary? Please read on for some tips.

## The overall process

The gist behind installing Linux alongside Windows is to create two fragments on your hard disk: one for everything Windows and the other for everything Linux. You install Windows boot manager and a Linux distribution on these fragments, respectively.

Then everytime you start your computer, you will be presented with a simple menu that allows you to choose which OSto boot into.

Then you go to the BIOS settings to configure the boot order. The boot sequence determines which OS to boot if there is no action from you.

That sounds so simple, isn't it? In truth, it took me two days to finish the dual booting process because there were always new error propping up that weren't mentioned in any tutorial. Installing is easy. It's just a sequence of clicking "Next" or "Agree" buttons. It's the troubleshooting that takes a lot of time.

There was time when I got stuck in an error that the only option was to unpluging the machine. There was time I ended up with no OS on my machine. I was very close to buying a new Macbook! In hindsight, however, dual booting is absolutely worth it. You just have to be very well prepared to make the process smoother.

## What you need to prepare

_Back up your data_ of course!

_Two USB sticks to create bootable Windows and Linux USB drives_. It may sound complicated, but this is how you install Windows, or Linux on a brand new machine, or reinstall them when they crash. Technically, you don't have to use USB drives. Historically, users would use floppy disks, CD, DVD but computers of today no longer come with optical disk drives. So booting from USB media has become the standard.

And finally, a spare computer, smartphone or any device where you can access the internet to search for answers to issues you may run into. I can't stretch enough how important it is, because you won't be able to use your main computer will setting up for dual booting, and you're very likely to run into issues here and there.

## What is the hardest step in dual booting?

Whether you install Linux or Windows, the installation wizard will always ask you to allocate disk space for the OS. If you give too little space, you may run into memory issue later on. If you give too much space to an OS, you may not have enough space to install the other OS. Disk allocation is a delicate balancing act. I recommend reading up on partitioning and disk management before starting the installation step.

The next tricky thing for me is how to access BIOS. Different machines require different keys to enter BIOS. Those keys can be F2, F8, F10, F12, Esc, or Del. I didn't enjoy trying all the keys until finding the one that worked.

By the way, I'm using Linux Mint. I chose it by accident because after installing Ubuntu and booting up, I got stuck forever in a "bash-like line editing" error. And I'm really happy that I went with Linux Mint. It works out of the box with nice, modern icons and somehow the way it works is similar to Windows. It is easy to find my way around and truth be told, I haven't read the Mint manual yet. If someone tells you that Linux is not user-friendly or only for geeks, you should try out Mint.
