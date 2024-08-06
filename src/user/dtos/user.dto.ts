export class FilterUserDto {
  page: string;
  item_page: string;
  search: string;
}

export class UpdateUserByAdminDto {
  username: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: string;
  google_id: string;
  facebook_id: string;
  is_2fa: boolean;
  is_verify: boolean;
}
