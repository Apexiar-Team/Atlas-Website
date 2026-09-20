// Offline review derivative only. Does not replace homepage media or source clips.
// node review/build-inspection-preview.js FFMPEG STATIONARY_APPROACH FINAL_VIDEO
const { spawnSync } = require('node:child_process');
const path = require('node:path');
const [ffmpeg, approach, inspection] = process.argv.slice(2);
if (!ffmpeg || !approach || !inspection) throw new Error('Provide FFmpeg and both source paths.');
const verify = process.argv.includes('--verify');
const output = verify ? path.join(require('node:os').tmpdir(), 'apexiar-preview-frames.md5') : path.join(__dirname, 'inspection-dramatic.mp4');
const ease = (start, frames) => {
  const p = `clip((on-${start})/${frames},0,1)`;
  return `(${p}*${p}*(3-2*${p}))`;
};
// First 96 frames: unchanged four-second stationary approach. The inspection
// uses 6 + 34 + 8 + 36 + 60 frames = six seconds, with a real final freeze.
const zoom = `if(lt(on,96),1,1.08+0.07*${ease(102,33)}+0.13*${ease(144,35)})`;
const filter = [
  '[0:v]trim=start_frame=0:end_frame=96,setpts=PTS-STARTPTS,setsar=1[a]',
  '[1:v]split=5[s0][s1][s2][s3][s4]',
  '[s0]trim=start_frame=96:end_frame=97,loop=loop=5:size=1:start=0,setpts=N/(24*TB),setsar=1[b]',
  '[s1]trim=start_frame=96:end_frame=156,setpts=(PTS-STARTPTS)*34/60,fps=24,trim=end_frame=34,setsar=1[c]',
  '[s2]trim=start_frame=156:end_frame=157,loop=loop=7:size=1:start=0,setpts=N/(24*TB),setsar=1[d]',
  '[s3]trim=start_frame=156:end_frame=241,setpts=(PTS-STARTPTS)*36/85,fps=24,trim=end_frame=36,setsar=1[e]',
  '[s4]trim=start_frame=240:end_frame=241,loop=loop=59:size=1:start=0,setpts=N/(24*TB),setsar=1[f]',
  '[a][b][c][d][e][f]concat=n=6:v=1:a=0[sequence]',
  // Upsampling before cropping reduces integer crop-coordinate stepping.
  `[sequence]scale=3832:2160,zoompan=z='${zoom}':x='iw/2-iw/zoom/2':y='ih/2-ih/zoom/2':d=1:s=1600x902:fps=24,setsar=1,format=yuv420p[v]`
].join(';');
const encoding = verify ? ['-f', 'framemd5'] : ['-c:v', 'h264_mf', '-b:v', '8500k', '-g', '1', '-bf', '0', '-movflags', '+faststart'];
const result = spawnSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-i', approach, '-i', inspection,
  '-filter_complex', filter, '-map', '[v]', '-an', ...encoding, '-y', output], { stdio: 'inherit' });
if (result.status !== 0) process.exit(result.status || 1);
console.log(output);
