Place certificate screenshots or credential images in this folder.

Recommended filenames:

- ccna-introduction-to-networks.png
- ccna-switching-routing-wireless-essentials.png
- introduction-to-cybersecurity.png
- aws-academy-cloud-foundations.png

After adding an image, connect it in `src/lib/certifications.ts` by setting:

```ts
certificateImage: "/certifications/file-name.png"
```

If you have an official credential URL, add:

```ts
credentialUrl: "https://..."
```
