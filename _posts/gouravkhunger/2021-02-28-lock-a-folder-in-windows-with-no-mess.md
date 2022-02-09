---
layout: post
title:  "Lock a Folder in Windows with no mess"
excerpt: "Learn how to lock a folder on your computer to safeguard it from unauthorized access."
image: "https://cdn.hashnode.com/res/hashnode/image/upload/v1614498876551/PoGi9qzEM.png"
audioId: 3468133
hasCode: true
category: windows
tags: ["security"]
author: gouravkhunger
---

Hi guys, today I'm going to share something many of us actually need. Most of the time, we need to lock our private folders which may include password text files, business data, media, and much more, which we don't want other sneaky people to have a look into.

But if you are a Windows guy, this can be tricky, as there is no out-of-the-box functionality available in windows to do this. To accomplish such a task, we may download some unknown software from the internet, which *often* turns out to be malware.

So, to avoid this, you can use this simple batch program, which can make a secure folder, that can be locked and unlocked as and when needed.

For better understanding, check out this video :)

{% include youtube.html id="DRDWdT1jcKQ" %}

Now, as our objective is clear, you can proceed to follow the steps below:

# Copy this code and paste it into NotePad

```bash
cls
@ECHO OFF
if EXIST "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}" goto UNLOCK
if NOT EXIST Secure goto MDSecure
:CONFIRM
echo Are you sure to lock this folder? (Y/N)
set/p "cho=>"
if %cho%==Y goto LOCK
if %cho%==y goto LOCK
if %cho%==n goto END
if %cho%==N goto END
echo Invalid choice.
goto CONFIRM
:LOCK
ren Secure "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"
attrib +h +s "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"
echo Folder locked
goto End
:UNLOCK
echo Enter password to Unlock Your Secure Folder
set/p "pass=>"
if NOT %pass%== <ENTER_YOUR_REQUIRED_PASSWORD> goto FAIL
attrib -h -s "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}"
ren "Control Panel.{21EC2020-3AEA-1069-A2DD-08002B30309D}" Secure
echo Folder Unlocked successfully
goto End
:FAIL
echo Invalid password
goto UNLOCK
:MDSecure
md Secure
echo Secure created successfully
goto End
:End
```

# Add your desired password
This can be tricky but is really easy, just find `<ENTER_YOUR_REQUIRED_PASSWORD>` in the file (with `Ctrl+F` key combination) and replace this whole thing with what you want as your password. For example, if you change that line to:

```bash
if NOT %pass%==1234 goto FAIL
```

This line sets the password to `1234`. You can change it to your desired value.

# Save the file as locker.bat

Be sure to change *Save as type* to *All Files* and the extension of the file should be `.bat` and save it at your desired location.

![save](https://dev-to-uploads.s3.amazonaws.com/i/24adj0czbwmps88pqrxp.jpg)

# Double click the locker.bat file

This will make a folder named `Secure` beside the `locker.bat` file. 

**Move the files which you need to lock to this new `Secure` folder.**

# Double click the locker.bat file again

This time, you will be asked if you want to lock the folder or not. Enter `Y` and press enter.

_The `Secure` folder will be hidden now. Be assured that the folder can't be viewed even when the **View Hidden Files** attribute is enabled in File Explorer_

---

Congrats! You have secured your folder. Now, to access the files again, double click the `locker.bat` file again, and enter the password you set previously. This will make the `Secure` folder pop up again, you can do your desired changes and lock the folder again.

I hope this article helped you. Thanks for reading so far :)
