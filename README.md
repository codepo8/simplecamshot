# SimpleCamShot - add a button to get a photo from your camera

This is a simple script I put together for the [Project Oxford](http://projectoxford.ai) team to add "use my camera" buttons to their amazing image recognition demos.

## Usage

To add this functionality to your site, you need to include the script, and call its init method with a valid DOM element to add the button and video to. For example, the [simplest demo here](https://codepo8.github.io/simplecamshot/index.html) used the following code:

```xml
<div id="simplecam"></div>
<script src="simplecamshot.js"></script>
<script>
  simplecamshot.init(document.querySelector('#simplecam'));
</script>
```
The script checks if your browser supports camera access and only creates a button starting the camera when that is the case. Clicking this button then asks the user to share their camera. Once the video is playing, you can click it to create a screenshot (the video is nested in a button element to allow for keyboard acces). Pressing the button again turns off the camera access.

## Changing the configuration

The script has a few configuration options you can override when calling the `init` method.

* `startLabel` - the text of the button when it is added to the element. Preset is 'Start Camera',
* `stopLabel` - the text of the button when the video is playing. Preset is 'StarStopt Camera',
* `width` - the width of the video, the height gets calculated from the apect ratio of the camera.
* `createImage` - a Boolean defining if the script should create an image automatically when the user clicks the video.

You can see how this works in the various demos. For example, the [Own Labels Demo](https://codepo8.github.io/simplecamshot/own-labels.html) uses the following code to create a German button:

```xml
<div id="simplecam"></div>
<script src="simplecamshot.js"></script>
<script>
simplecamshot.config.startLabel = 'Kamera an';
simplecamshot.config.stopLabel = 'Kamera aus';
simplecamshot.init(document.querySelector('#simplecam'));
</script>
```
## Using the camera shot in your own scripts

If you don't want this script to create a photo, you can override this and listen for a custom event called `imagetaken` on your DOM element instead. The [Own Image Demo](https://codepo8.github.io/simplecamshot/own-image.html) does this:

```xml
<div id="simplecam"></div>

<img src="http://placekitten.com/g/320/261" alt="kitten">

<script src="simplecamshot.js"></script>
<script>
var camelement = document.querySelector('#simplecam');
simplecamshot.config.createImage = false;
simplecamshot.init(camelement);
camelement.addEventListener(
  'imagetaken',
   function(data) {
     document.querySelector('img').src = data.detail;
  }
);
</script>
```

## Browser support

This was tested on a Desktop using Firefox, Chrome, Opera and Microsoft Edge. Safari doesn't support the way this is implemented, and - like any other browser that doesn't - it means the button will never show up. The idea of this script is to only offer this functionality when it can be done instead of polyfilling. It is meant to enhance a photo upload form.

## Future updates

Currently this script uses the old gUM API as it seems to me to be still better supported across browsers. I will update it to the better API (shown n the new-api-test.html) once it is better supported. 
