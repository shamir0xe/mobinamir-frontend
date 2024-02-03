#!/bin/bash
repository='https://github.com/shamir0xe/mobinamir-frontend.git'
app_dir=$(pwd)
output_dir=$app_dir/output
release_dir=$output_dir/releases
release=$(date +"%Y%m%d-%H%M%S")
new_release_dir=$release_dir/$release

echo 'Cloning repository'
[ -d "$release_dir" ] || mkdir -p "$release_dir"
git clone --depth 1 $repository "$new_release_dir" --recursive

echo 'Linking NodeModules'
rm -rf "$new_release_dir"/node_modules
ln -nfs "$app_dir"/node_modules "$new_release_dir"/node_modules

echo 'Linking Assets'
rm -rf "$new_release_dir"/assets
ln -nfs "$app_dir"/assets "$new_release_dir"/assets

echo 'Unlinking previous release'
unlink "$output_dir"/current

echo 'Linking current release'
ln -nfs "$new_release_dir" "$output_dir"/current

echo 'Installing dependencies'
cd "$new_release_dir" || exit
npm install

echo 'Running npm build'
cd "$new_release_dir" || exit
npm run build
