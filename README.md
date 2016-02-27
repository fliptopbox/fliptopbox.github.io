# NukeX

Here are some things I have started to collect that replace to Nuke, and linux. Things that I fin myself forgetting, and looking up on google over and over.

## Nuke snippets

**[ColorEdge](ColorEdge.txt)** is a node group that is fantastic tool for marker removal.

**[Vkeyer](vkeyer.txt)** a very interesting way to de-spill using a second matte to inject overlapping values from the background plate. (kudos to victor perez)

## Installing ImageMagick with openExt support

For mac user on "El Capitan", you will need to ensure you have the most up-to-date version of Xcode (v7.2.1) and home-brew (v0.9.5) installed and working before you continue.

	# install openEXR
	brew install opener
	
	# install imagemagic (with EXR support)
	brew install imagemagick --with-openexr
	

## Bash scripts

Loop through a directory of .exr files, and convert them to .jpg, and delete the massive original so that you can keep disk space low.

	for ME in *.exr;
	do
		# the "&&" stops the delete if errors occur
		convert $ME ${ME%.exr}.jpg && rm $ME;
	done;

Open a text file, and use the contents as an array to rename files so that they correspond to the list in the text file.

	for LINE in $(< ordered_list.txt)
	do
		(bash commands);
	done;