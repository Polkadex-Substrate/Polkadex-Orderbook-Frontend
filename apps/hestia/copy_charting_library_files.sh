#https://github.com/tradingview/charting-library-examples/blob/master/nextjs/copy_charting_library_files.sh

#!/bin/sh

remove_if_directory_exists() {
	if [ -d "$1" ]; then rm -Rf "$1"; fi
}

create_if_directory_does_not_exists() {
	if [ ! -d "$1" ]; then mkdir "$1"; fi
}

BRANCH="master";

REPOSITORY='git@github.com:tradingview/charting_library.git'

TEMP_FOLDER="temp"

remove_if_directory_exists "$LATEST_HASH"

git clone $REPOSITORY $TEMP_FOLDER

create_if_directory_does_not_exists 'public'
create_if_directory_does_not_exists 'public/static'

remove_if_directory_exists "public/static/charting_library"
remove_if_directory_exists "public/static/datafeeds"

cp -r "$TEMP_FOLDER/charting_library" public/static
cp -r "$TEMP_FOLDER/datafeeds" public/static

remove_if_directory_exists "$TEMP_FOLDER"